const talentService = require('../services/talent')
const Stat = require('../services/stat')

let talent = new talentService.Talent(
    'Cursed',
    'Reduce enemy evasion.'
)
//duration
talent.initPassive(
    54
)
talent.initStackable(12)

const reduceEvasionBase = new Stat()
reduceEvasionBase.evasion = 0
const reduceEvasionPerRank = new Stat()
reduceEvasionPerRank.evasion = -1
const reduceEvasionPerStack = new Stat()
reduceEvasionPerStack.evasion = -2

talent.addBuff(
    new talentService.Modifier(
        talentService.APPLY_TYPE.DIRECT,
        reduceEvasionBase,
        reduceEvasionPerRank,
        reduceEvasionPerStack
    )
)

module.exports = talent