const Stat = require('./stat')
const PassiveTalentNames = require('../assets/passive-talent-names.json')

const APPLY_TYPE = {
    DIRECT: 'direct',
    PERCENT: 'percent',
}

const DAMAGE_TYPE = {
    PHYSICAL: 'physical',
    MAGICAL: 'magial'
}

const ABILITY_STRENGTH = {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    ULTIMATE: 'ultimate'
}

const ABILITY_ACTION = {
    DAMAGE: 'damage',
    APPLY_BUFF: 'apply_buff',
    CONSUME_BUFF: 'consume_buff',
    WAIT: 'wait'
}

const ABILITY_TARGET = {
    SELF: 'self',
    TARGET: 'target',
    ENEMY_TARGET: 'enemy_target',
    TEAM_TARGET: 'team_target',
    AOE_ENEMY: 'aoe_enemy',
    AOE_TEAM: 'aoe_team'
}

const roll = amount => Math.floor(Math.random() * (amount + 1))
const roll20 = () => Math.floor(Math.random() * 20) + 1

const calcDamage = (talent, action, playerEntity, targetEntity) => {
    let playerStats = playerEntity.calcStats()
    let enemyStats = targetEntity.calcStats()
    //roll attack
    let attackRoll = roll20()
    let attackRollBonus = Math.floor(
        (talent.damageType === DAMAGE_TYPE.PHYSICAL ? playerStats.physical : playerStats.magical)
        * 0.01
    )
    let evasion = Math.floor(enemyStats.evasion * 0.18)
    //on attack miss
    if((attackRoll + attackRollBonus) <= evasion) return {miss:true, attackRoll, evasion}
    //on attack hit
    let damage = 0
    //apply any ability specific stat bonuses
    if(action.passiveModifiers)
        action.passiveModifiers.forEach(passiveModifier => {
            const passive = targetEntity.passives[passiveModifier.passive]
            let stacks = 1
            if(passive && passive.stacks) stacks = passive.stacks
            playerStats = Modifier.apply(passiveModifier.modifier, talent.rank, playerStats, stacks)
        })
    // console.log(playerStats)
    //calc damage and bonus damage
    //damage based on ability strength
    //bonus based on player stats
    let baseDamage = 0, damageRoll = 0
    let bonus = talent.damageType === DAMAGE_TYPE.PHYSICAL ? playerStats.physical : playerStats.magical
    if(action.strength === ABILITY_STRENGTH.BASIC) {
        baseDamage = 6
        damageRoll = roll(9)
        bonus = Math.floor((bonus/3))
    }
    if(action.strength === ABILITY_STRENGTH.ADVANCED) {
        baseDamage = 18
        damageRoll = roll(36)
        bonus = Math.floor(((bonus/3) * 2))
    }
    if(action.strength === ABILITY_STRENGTH.ULTIMATE) {
        baseDamage = 45
        damageRoll = roll(54)
    }
    damage = baseDamage + damageRoll + bonus
    //rank bonus
    let rankBonus = talent.rank * 0.09
    damage += (damage * rankBonus)
    //critical roll and damage
    const critRoll = roll20()
    const rollBonus = (playerStats.critical * 0.06)
    let critBonus = 0
    if((critRoll + rollBonus)  >= 20) {
        critBonus = 2 + (playerStats.critDmg * 0.03)
        damage *= critBonus
    }
    const total = Math.floor(damage)
    //amount of damage reduced by enemy defense
    let defense = DAMAGE_TYPE.PHYSICAL ? enemyStats.block : playerStats.resist
    defense *= 0.01
    if(defense < 0) defense = 0
    const deflected = Math.floor((damage * defense))
    damage -= deflected
    damage = Math.floor(damage)
    return {damage, total, critRoll, critBonus, deflected, defense, baseDamage, damageRoll, bonus, attackRoll, attackRollBonus, evasion}
}

const toRes = (resObj, res) => {
    for(const key in res){
        resObj[key] = res[key]
    }
}
const activate = (talent, playerEntity, targetEntity) => {
    const abilities = require('../abilities/abilities')
    let res = []
    talent.actions.forEach(action => {
        let target = action.target === ABILITY_TARGET.SELF ? playerEntity : targetEntity
        let resObj = {type: action.type, caster: playerEntity.id, target: targetEntity.id}
        switch(action.type){
            case ABILITY_ACTION.DAMAGE:
                toRes(resObj, calcDamage(talent, action, playerEntity, targetEntity))
                break;
            case ABILITY_ACTION.APPLY_BUFF:
                if(!target.passives[action.passive])
                    target.passives[action.passive] = {name: action.passive, stacks: 0}
                const maxStacks = abilities[action.passive].maxStacks
                let targetPassive = target.passives[action.passive]
                target.passives[action.passive].stacks += action.stacks
                if(maxStacks && targetPassive.stacks > maxStacks)
                    target.passives[action.passive].stacks = maxStacks
                target.passives[action.passive].rank = talent.rank
                toRes(resObj, {name: action.passive, stacks: action.stacks})
                break;
            case ABILITY_ACTION.CONSUME_BUFF:
                target.passives[action.passive].stacks -= action.stacks
                toRes(resObj, {name: action.passive, stacks: action.stacks})
                break;
        }
        res.push(resObj)
    })
    return res
}

class Modifier {
    constructor(applyType, base, perRank, perStack){
        this.applyType = applyType
        this.base = base
        this.perRank = perRank
        this.perStack = perStack
    }
    static stats(mod, rank, stacks = 1){
        let bonus = mod.base
        bonus = Stat.add(bonus, Stat.multiply(mod.perRank, rank))
        bonus = Stat.add(bonus, Stat.multiply(mod.perStack, stacks))
        return bonus
    }
    static apply(mod, rank, stats, stacks = 1){
        const bonus = Modifier.stats(mod, rank, stacks)
        if(mod.applyType === APPLY_TYPE.DIRECT) stats = Stat.add(stats, bonus)
        if(mod.applyType === APPLY_TYPE.PERCENT) stats = Stat.percent(stats, bonus)
        return stats
    }
}

class Talent {
    constructor(name, desc, tags){
        this.name = name || ''
        this.desc = desc || ''
        this.rank = 0
        this.tags = tags || []
    }
    initActive(target, cooldown, damageType){
        this.isActive = true
        this.target = target
        this.cooldown = cooldown || 0
        this.damageType = damageType || DAMAGE_TYPE.PHYSICAL
        this.actions = []
        this.addCost = (passiveName, stacks, target, isRemoved = true) => {
            this.cost.push({name: passiveName, stacks, target})
            if(isRemoved)
                this.addActionConsumeBuff = (passiveName, stacks, target) => 
                    this.actions.push({type: ABILITY_ACTION.CONSUME_BUFF, passive: passiveName, stacks, target})
        }
        this.addPassiveModifier = (passiveName, target, modifier) => {return {passive: passiveName, target, modifier}}
        this.addActionDamage = (strength, ...passiveModifiers) => 
            this.actions.push({type: ABILITY_ACTION.DAMAGE, strength, passiveModifiers})
        this.addActionApplyBuff = (passiveName, stacks, target) => 
            this.actions.push({type: ABILITY_ACTION.APPLY_BUFF, passive: passiveName, stacks, target})
        this.addActionConsumeBuff = (passiveName, stacks, target) => 
            this.actions.push({type: ABILITY_ACTION.CONSUME_BUFF, passive: passiveName, stacks, target})
    }
    initPassive(duration){
        this.duration = duration
        this.addBuff = modifier => {
            this.modifier = modifier
            this.apply = (rank, stats, stacks) => Modifier.apply(this.modifier, rank, stats, stacks)
        }
        this.addDamage = (damageType, strength, tickCooldown) => {
            this.damageType = damageType
            this.strength = strength
            this.tickCooldown = tickCooldown
        }
    }
    initStackable(maxStacks){
        this.stackable = true
        this.stacks = 1
        if(maxStacks) this.maxStacks = maxStacks
    }
    clone(){
        return JSON.parse(JSON.stringify(this))
    }
}

class TalentTree {
    constructor() {
        this.tier = 0
        this.talents = []
    }
    generateTalents(item) {
        const abilities = require('../abilities/abilities')
        let newTier = []
        if(this.tier < 4) {
            let tags = [item.type]
            if(item.weaponType) tags.push(item.weaponType)
            const randomActives = Object.values(abilities).filter(ability => 
                ability.tags.find(tag => tags.find(t => tag === t))
            )
            const active = randomActives[Math.floor(Math.random() * randomActives.length)]
            active.maxRanks = 2 + roll(4) // 3-6
            newTier.push(active)
        } else 
            newTier.push(this.generatePassiveTalent())
        newTier.push(this.generatePassiveTalent())
        newTier.push(this.generatePassiveTalent())
        this.talents.push(newTier)
    }
    generatePassiveTalent(){
        let statNames = Object.keys(PassiveTalentNames)
        let stat = statNames[Math.floor(Math.random() * statNames.length)]
        const name = PassiveTalentNames[stat][Math.floor(Math.random() * PassiveTalentNames[stat].length)]
        const maxRanks = 1 + roll(2) // 1-3
        const bonusPerRank = 3 + roll(3) // 3-6
        return {name, maxRanks, stat, bonusPerRank}
    }
    tierUp(item){
        this.tier++
        this.generateTalents(item)
    }
}

module.exports = {
    calcDamage, activate,
    Modifier, Talent, TalentTree,
    APPLY_TYPE, DAMAGE_TYPE, ABILITY_STRENGTH, ABILITY_ACTION, ABILITY_TARGET
}