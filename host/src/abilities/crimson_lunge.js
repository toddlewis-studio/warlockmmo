const talentService = require('../services/talent')
const Stats = require('../services/stat')
const itemService = require('../services/item')

let talent = new talentService.Talent(
    'Crimson Lunge',
    'Basic physical attack that applies bleed and deals bonus damage per stack of bleed.',
    [
        itemService.WEAPON_TYPE.RAPIER,
        itemService.WEAPON_TYPE.HALBERD,
        itemService.WEAPON_TYPE.SCYTHE,
        itemService.ITEM_TYPE.DEMON,
        itemService.ITEM_TYPE.MASK
    ]
)
talent.initActive(
    talentService.ABILITY_TARGET.ENEMY_TARGET,
    12, 
    talentService.DAMAGE_TYPE.PHYSICAL
)
talent.addActionApplyBuff('Bleed', 2, talentService.ABILITY_TARGET.TARGET)

const bonusPerBleed = new Stats()
bonusPerBleed.physical = 6
const bonusPerBleedRank = new Stats()
bonusPerBleedRank.physical = 18
const bonusPerBleedStack = new Stats()
bonusPerBleedStack.physical = 9

talent.addActionDamage(
    talentService.ABILITY_STRENGTH.BASIC,
    talent.addPassiveModifier(
        'Bleed',
        talentService.ABILITY_TARGET.TARGET,
        new talentService.Modifier(talentService.APPLY_TYPE.DIRECT, bonusPerBleed, bonusPerBleedRank, bonusPerBleedStack)
    )
)

module.exports = talent