const FB = require('./firebase')

const initGame = async () => {
    //check if game data exists
    const gameExistsRef = new FB('game/exists')
    if(!gameExistsRef.isEmpty()) throw {error: 'GameExistsError', message: 'Cannot init a new game while a game already exists'}
    gameExistsRef.push(true)
    //generate map
    const locationService = require('./location')
    const mapRes = await locationService.initGameMap()
    await mapRes.save()
    return {message: 'New game initiated'}
}

const resetGame = async () => {
    const gameRef = new FB('game')
    await gameRef.push(undefined)
}

let state
const resetState = () => state = {
    exists: undefined,
    starterZone: undefined,
    territory: {},
    node: {}
}
resetState()

const loadGameState = async () => {
    const gameExistsRef = new FB('game/exists')
    state.exists = await gameExistsRef.read()
    if(state.exists){
        const starterZoneRef = new FB('game/startinfo')
        state.starterZone = await starterZoneRef.read()
    } else resetState()
}
const editState = fn => state = fn(state)

module.exports = {
    initGame, resetGame, state: () => state, loadGameState, editState
}