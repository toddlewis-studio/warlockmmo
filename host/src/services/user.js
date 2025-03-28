const FB = require('./firebase');
const gameService = require('./game')
const itemService = require('./item')
const locationService = require('./location');

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
        currency: {
            gold: 0,
            spirit: 0,
            experience: 0
        },
        location,
    }

    const checkUser = await getUser(id);
    if(checkUser) throw {error: 'UserFoundError', message: 'Cannot init a user when a user already exists'}
    let rapier = itemService.initStarterRapier()
    rapier = await rapier.save()
    user.equip.push(rapier.id)
        
    const userRef = new FB(`user/${id}`)
    await userRef.push(user)

    const world = locationService.getWorld()
    return {user, world}
}

const signin = async id => {
    const userRef = new FB(`user/${id}`)
    const user = await userRef.read()
    if(!user) return {error: "UserNotFound", message: "User not found"}
    const world = locationService.getWorld()
    return {user, world}
}

module.exports = {
    getUser, init, signin
}