class Talent {
    constructor(){
        this.name = ''
        this.rank = 0
    }
    initActive(){
        this.isActive = true
    }
    initPassive(){
        this.statsPerRank = undefined
        this.stats = () => {
            // return statsPerRank * rank
        }
    }
}

class TalentTree {
    constructor(item) {
        this.itemType = item.type
        if(item.type === 'weapon') this.weaponType = item.weaponType
        this.tier = 0
        this.talents = []
    }
    generateTalents() {
        this.talents.push()
    }
    tierUp(){
        this.tier++
        this.generateTalents()
    }
}