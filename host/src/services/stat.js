module.exports = class Stats {
    constructor(statBlock) {
        this.health = 0
        this.regen = 0
        this.physical = 0
        this.magical = 0
        this.block = 0
        this.resist = 0
        this.haste = 0
        this.critical = 0
        this.critDmg = 0
        this.evasion = 0

        for(const key in statBlock) {
            this[key] = statBlock[key]
        }
    }
    static add(stats, bonus) {
        const res = new Stats()
        for (const key in bonus) {
            if (typeof bonus[key] === 'number') {
                const value = bonus[key]
                res[key] = stats[key] + value
            }
        }
        return res
    }
    static percent(stats, bonus) {
        const res = new Stats()
        for (const key in bonus) {
            if (typeof bonus[key] === 'number') {
                const value = bonus[key]
                res[key] = stats[key] + Math.floor(stats[key] * value)
            }
        }
        return res
    }
    static multiply(stats, amount){
        const res = new Stats()
        for (const key in stats) {
            if (typeof stats[key] === 'number') 
                res[key] = amount * stats[key]
        }
        return res
    }
}