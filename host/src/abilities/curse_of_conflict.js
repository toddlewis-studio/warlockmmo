const talentService = require('../services/talent')
const Stat = require('../services/stat')
const itemService = require('../services/item')

let talent = new talentService.Talent(
    'Curse of Conflict',
    'Us on an enemy with 12 stacks of cursed to deal ultimate physical damage with huge critical bonus.',
    [
        itemService.WEAPON_TYPE.SCEPTER,
        itemService.WEAPON_TYPE.SCYTHE,
        itemService.WEAPON_TYPE.FLAIL,
        itemService.ITEM_TYPE.DEMON,
        itemService.ITEM_TYPE.MASK
    ]
)
talent.initActive(
    talentService.ABILITY_TARGET.ENEMY_TARGET,
    90, 
    talentService.DAMAGE_TYPE.PHYSICAL
)
talent.addCost('Cursed', 12, talentService.ABILITY_TARGET.ENEMY_TARGET, false)
talent.addActionDamage(
    talentService.ABILITY_STRENGTH.ULTIMATE,
    talent.addPassiveModifier(
        'Cursed',
        talentService.ABILITY_TARGET.TARGET,
        new Stat({critical: 30, critDmg: 18}),
        new Stat({critical: 9, critDmg: 18}), 
        new Stat()
    )
)
talent.addActionConsumeBuff('Cursed', 12, talentService.ABILITY_TARGET.TARGET)

module.exports = talent