const talentService = require('../services/talent')
const Stats = require('../services/stat')
const itemService = require('../services/item')

let talent = new talentService.Talent(
    'Piercing Waltz',
    'Deal 3 stikes dealing minor to moderate physical damage.',
    [
        itemService.WEAPON_TYPE.RAPIER
    ]
)
talent.initActive(
    talentService.ABILITY_TARGET.ENEMY_TARGET,
    42, 
    talentService.DAMAGE_TYPE.PHYSICAL
)

talent.addActionDamage(talentService.ABILITY_STRENGTH.BASIC)
talent.addActionDamage(talentService.ABILITY_STRENGTH.BASIC)
talent.addActionDamage(talentService.ABILITY_STRENGTH.ADVANCED)

module.exports = talent