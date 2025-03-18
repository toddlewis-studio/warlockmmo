const talentService = require('../services/talent')

let talent = new talentService.Talent(
    'Bleed',
    'Deals minor physical damage over time.'
)
//duration
talent.initPassive(
    20
)
talent.initStackable(6)
talent.addDamage(
    talentService.DAMAGE_TYPE.PHYSICAL,
    talentService.ABILITY_STRENGTH.BASIC,
    4
)

module.exports = talent