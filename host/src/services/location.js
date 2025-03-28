const FB = require('./firebase')
const game = require('./game')

const namegen = require('./namegen')

const placeNode = (nodes, node) => {
    let x, y
    do {
        x = Math.floor(Math.random() * 12)+1
        y = Math.floor(Math.random() * 12)+1
    } while (nodes.find(n => n.x === x && n.y === y))

    nodes.push({
        x, y, nodeId: node.id
    })
}

const generateTerritory = (tier = 1) => {
    const name = namegen.generateTerritoryName()
    const nodes = []
    const territory = {
        name, nodes, tier,
    }
    const gameTerritoryRef = new FB('game/territory')
    const gameNodeRef = new FB('game/node')
    const territoryRef = gameTerritoryRef.createUnsaved(territory)
    //generate default zones - 1 tavern, 1 camp, 1 camp (+1t)
    const tavern = generateNode(territory.id, NODE_TYPE.TAVERN, tier)
    const tavernRef = gameNodeRef.createUnsaved(tavern)
    placeNode(nodes, tavern)
    const camp1 = generateNode(territory.id, NODE_TYPE.CAMP, tier)
    const camp1Ref = gameNodeRef.createUnsaved(camp1)
    placeNode(nodes, camp1)
    const camp2 = generateNode(territory.id, NODE_TYPE.CAMP, tier+1)
    const camp2Ref = gameNodeRef.createUnsaved(camp2)
    placeNode(nodes, camp2)

    const save = async () => {
        await territoryRef.save()
        await tavernRef.save()
        await camp1Ref.save()
        await camp2Ref.save()
    }

    return {territory, tavernId: tavern.id, save}
}

const NODE_TYPE = {
    CAMP: 'camp',
    TAVERN: 'tavern',
    PVPCAMP: 'pvpcamp',
    ARENA: 'arena',
    BOSS: 'boss',
    RAID: 'raid'
}
const generateNode = (territoryId, type, tier) => {
    let name;
    switch(type){
        case NODE_TYPE.CAMP:
            name = namegen.generateCampName()
            break;
        case NODE_TYPE.TAVERN:
            name = namegen.generateTavernName()
            break;
    }
    const node = {
        name, type, tier, territoryId
    }
    return node
}

const initGameMap = async () => {
    const territoryRes = generateTerritory(1)
    console.log(territoryRes.territory)
    const starterZoneRef = new FB('game/startinfo')
    
    const save = () => {
        territoryRes.save()
        starterZoneRef.push({
            territory: territoryRes.territory.id, 
            node: territoryRes.tavernId
        })
    }

    return {save}
}

const getLocation = async (territoryId, nodeId) => {
    console.log(Object.keys(game))
    let territory = game.state().territory[territoryId]
    if(!territory) {
        const ref = new FB(`game/territory/${territoryId}`)
        territory = await ref.read()
        game.editState(state => {
            state.territory[territoryId] = territory
            return state
        })
    }
    let node = game.state().node[nodeId]
    if(!node) {
        const ref = new FB(`game/node/${nodeId}`)
        node = await ref.read()
        game.editState(state => {
            state.node[nodeId] = node
            return state
        })
    }
    return {territory, node}
}

const getWorld = () => {
    let world = {territory: {}, node: {}}
    world.territory = game.state().territory
    world.node = game.state().node
    return world
}

module.exports = {
    initGameMap, generateTerritory, getLocation, getWorld
}