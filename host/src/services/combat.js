const abilities = require('../abilities/abilities')
const itemService = require('./item')
const talentService = require('./talent')
const Stat = require('./stat')

class Entity {
    constructor(id, stats) {
        this.id = id
        this.stats = stats
        this.passives = {}
        this.actives = {}
        this.cooldowns = {}
    }
    addItem(item){
        item.talentTree.talents.forEach(tier => tier.forEach(talent => {
            if(talent.rank && talent.stat) {
                let bonus = new Stat()
                bonus[talent.stat] = (talent.bonusPerRank * talent.rank)
                this.stats = Stat.add(this.stats, bonus)
            }
            if(talent.rank && talent.isActive) {
                this.actives[talent.name] = talent
            }
        }))
    }
    addCooldown(name, duration){
        this.cooldowns[name] = {duration}
    }
    addPassive(name, duration, stacks){
        if(!this.passives[name]) this.passives[name] = {duration, stacks}
        else {
            this.passives[name].stacks += stacks
            this.passives[name].duration = duration
        }
    }
    calcStats() {
        let stats = this.stats
        Object.values(this.passives).forEach(buff => {
            const passive = abilities[buff.name]
            if(passive.modifier)
                stats = passive.apply(buff.rank, stats, buff.stacks)
        })
        return stats
    }
}

class Room {
    constructor(teams, ...entities) {
        this.entities = {}
        entities.forEach(entity => this.entities[entity.id] = entity)
        this.teams = teams || {}
        this.roomTime = 0
        this.history = []
    }
    useAbility(entityId, targetIdAr, abilityName){
        const roomTime = this.roomTime
        const caster = this.entities[entityId]
        const targets = targetIdAr.map(targetId=>this.entities[targetId])
        const ability = abilities[abilityName].clone()
        ability.rank = 1 //todo add ability rank
        caster.addCooldown(ability.name, ability.cooldown)
        let res = []
        targets.forEach(target => 
            res.push(talentService.activate(ability, caster, target))
        )
        this.history.push({type: 'active', res, name: abilityName, caster: entityId, targets: targetIdAr, roomTime})
    }
    tick(){
        this.roomTime++
        //cooldowns
        Object.values(this.entities).forEach(entity => {
            for(const key in entity.cooldowns){
                entity.cooldowns[key].duration -= 1
            }
        })
    }
    run(){
        this.interval = setInterval(() => {
            this.tick()
        }, 333)
    }
}

const test = () => {

    const rapier = new itemService.Item()
    rapier.init(itemService.ITEM_TYPE.WEAPON, itemService.WEAPON_TYPE.RAPIER)
    rapier.talentTree.talents.forEach(tier => tier.forEach(talent => talent.rank = talent.maxRanks))
    console.log(rapier.talentTree.talents)

    const rapier2 = new itemService.Item()
    rapier2.init(itemService.ITEM_TYPE.WEAPON, itemService.WEAPON_TYPE.RAPIER)
    rapier2.talentTree.talents.forEach(tier => tier.forEach(talent => talent.rank = talent.maxRanks))
    console.log(rapier2.talentTree.talents)

    const player = new Entity(
        'player', 
        new Stat()
    )
    player.addItem(rapier)
    player.addItem(rapier2)
    console.log(player.calcStats())

    const room = new Room({},
        player,
        new Entity(
            'enemy',
            new Stat({
                evasion: 8
            })
        )
    )
    const ability = Object.keys(player.actives)[0]
    room.useAbility('player', ['enemy'], ability)
    console.log(room.history[0].res)
    
}

module.exports = {
    test,
    Entity
}