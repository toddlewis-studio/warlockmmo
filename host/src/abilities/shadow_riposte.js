const talentService = require('../services/talent')
const Stats = require('../services/stat')
const itemService = require('../services/item')

let talent = new talentService.Talent(
    'Shadow Riposte',
    'Basic physical attack that applies 4 stacks of cursed.',
    [
        itemService.ITEM_TYPE.WEAPON,
        itemService.ITEM_TYPE.DEMON,
        itemService.ITEM_TYPE.MASK
    ]
)
talent.initActive(
    talentService.ABILITY_TARGET.ENEMY_TARGET,
    12,
    talentService.DAMAGE_TYPE.PHYSICAL
)
talent.addActionApplyBuff('Cursed', 4, talentService.ABILITY_TARGET.TARGET)
talent.addActionDamage(talentService.ABILITY_STRENGTH.BASIC)

module.exports = talent