const FB = require('./firebase');
const gameService = require('./game')

const getUser = async (id) => {
    console.log('getUser', id)
    const userRef = new FB('user')
    const user = await userRef.getById(id)
    console.log('getUser', user)
    return user
}

const init = async (id, username) => {
    console.log('init', username)
    const location = gameService.state().starterZone
    if(!location) throw {error: 'GameNotRunning', message: "The game isn't initialized"}
    const user = {
        id,
        username,
        inventory: [],
        equip: [],
        gold: 0,
        spirit: 0,
        experience: 0,
        location,
    }

    const checkUser = await getUser(id);
    if(checkUser) throw {error: 'UserFoundError', message: 'Cannot init a user when a user already exists'}

    const userRef = new FB(`user/${id}`)
    await userRef.push(user)
    return {user, message: 'User initialized'}
}

module.exports = {
    getUser, init
}