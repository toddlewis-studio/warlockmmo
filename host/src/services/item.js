const FB = require('./firebase')
const talentService = require('./talent')

const ITEM_TYPE = {
    WEAPON: 'weapon',
    DEMON: 'demon',
    MASK: 'mask'
}

const WEAPON_TYPE = {
    RAPIER: 'rapier',
    HALBERD: 'halberd',
    SCEPTER: 'scepter',
    FLAIL: 'flail',
    SCYTHE: 'scythe'
}

class Item {
    constructor(){}
    init(type, weaponType){
        switch(type){
            case ITEM_TYPE.DEMON: this.initDemon(); break;
            case ITEM_TYPE.MASK: this.initMask(); break;
            case ITEM_TYPE.WEAPON: this.initWeapon(weaponType); break;
        }
        this.talentTree = new talentService.TalentTree(this)
        this.talentTree.tierUp(this)
    }
    initDemon(){
        this.type = ITEM_TYPE.DEMON
        this.summoned = false
        this.lifespan = 0
        this.foodSource = undefined
        this.levelTimer = 0
        this.summonCost = undefined
    }
    initWeapon(weaponType){
        this.type = ITEM_TYPE.WEAPON
        this.weaponType = weaponType
        this.levelCost = []
    }
    initMask(){
        this.type = ITEM_TYPE.MASK
        this.essenceNeeded = undefined
    }
    async save(){
        const itemRef = new FB('item')
        if(!this.id){
            const unsaved = itemRef.createUnsaved(JSON.parse(JSON.stringify(this)))
            await unsaved.save()
            return unsaved.data
        }
    }
}

const initStarterRapier = () => {
    const rapier = new Item()
    rapier.init(ITEM_TYPE.WEAPON, WEAPON_TYPE.RAPIER)
    rapier.talentTree[0][0].rank = 1
    return rapier
}

module.exports = {
    initStarterRapier,
    Item,
    ITEM_TYPE,
    WEAPON_TYPE
}