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
    constructor(){
        this.name = ""
        this.type = undefined
        this.tier = 0
        this.stats = undefined
    }
    initDemon(){
        this.summoned = false
        this.lifespan = 0
        this.foodSource = undefined
        this.experience = 0
        this.summonCost = undefined
    }
    initWeapon(){
        this.weaponType = undefined
        this.levelCost = undefined
    }
    initMask(){
        this.essenceNeeded = undefined
    }
}