const FB = require('./firebase')

const locationService = require('./location')

const initGame = async () => {
    //check if game data exists
    const gameRef = new FB('game/exists')
    if(!gameRef.isEmpty()) throw {error: 'GameExistsError', message: 'Cannot init a new game while a game already exists'}
    //generate map
    const mapRes = locationService.initGameMap()
    await mapRes.save()
    return {message: 'New game initiated'}
}

const resetGame = async () => {
    const gameRef = new FB('game')
    await gameRef.push(undefined)
}

module.exports = {
    initGame, resetGame
}