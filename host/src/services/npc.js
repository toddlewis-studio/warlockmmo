const FB = require('./firebase')

const namegen = require('./namegen')

const generateNPC = (location, action, existingNpcs) => {
    const name = namegen.generateNPCName(existingNpcs)
    const npc = {
        name,
        location,
        action,
    }
    return npc
}

module.exports = {
    generateNPC, generateName
}