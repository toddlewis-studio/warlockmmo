let obj = {}

;[
    require('./bleed'),
    require('./crimson_lunge'),
    require('./cursed'),
    require('./piercing_waltz'),
    require('./shadow_riposte')
].forEach(ability => obj[ability.name] = ability)

module.exports = obj