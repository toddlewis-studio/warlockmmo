const FB = require('./firebase');

const getUser = async (id) => {
    console.log('getUser', id)
    const userRef = new FB('user')
    const user = await userRef.getById(id)
    console.log('getUser', user)
    return user
}

const init = async (id, username) => {
    console.log('init', username)
    const user = {
        username,
        inventory: [],
        location: {
            zone: 'starter',
            node: 'camp',
        },
    }

    const checkUser = await getUser(id);
    if(checkUser) return {error: 'UserFoundError', message: 'Cannot init a user when a user already exists'}

    const userRef = new FB(`user/${id}`)
    await userRef.push(user)
    return {user, message: 'User initialized'}
}

module.exports = {
    getUser, init
}