//return a random item from an array
const r = ar => ar[Math.floor(Math.random() * ar.length)]

const npcNames = require('../assets/npc-names.json')
const generateNPCName = (existingNames = []) => {
    let name;
    do {
        name = `${r(npcNames.firstname)} ${r(npcNames.lastname)}`;
    } while (existingNames.includes(name));
    return name;
}

const COLORS = ['red', 'blue', 'purple', 'green'];
const monsterNames = require('../assets/monster-names.json')
const generateMonster = (color, existingNames = []) => {
    if(!color)
        color = r(COLORS)
    let name;
    const list = monsterNames[color]
    do {
        name = `${r(list.prefixes)} ${r(list.names)}`;
    } while (existingNames.includes(name));
    return name;
}

const genericGenerate = (ar, existingNames = []) => {
    let name
    do {
        name = r(ar)
    } while (existingNames.includes(name))
    return name
}

const territoryNames = require('../assets/territory-names.json')
const generateTerritoryName = (existingNames = []) =>
    genericGenerate(territoryNames, existingNames)

const tavernNames = require('../assets/tavern-names.json')
const generateTavernName = (existingNames = []) =>
    genericGenerate(tavernNames, existingNames)

const campNames = require('../assets/camp-names.json')
const generateCampName = (existingNames = []) =>
    genericGenerate(campNames, existingNames)


module.exports = {
    npcNames, territoryNames, tavernNames, campNames, monsterNames,
    generateNPCName, generateTerritoryName, generateTavernName, generateCampName, generateMonster
}