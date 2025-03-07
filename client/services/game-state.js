let state

const resetState = () => state = {
    userId: undefined,
    user: undefined,
    location: undefined
}
resetState()

const set = obj => Object.keys(obj).forEach(key => state[key] = obj[key])
const edit = async fn => state = await fn()

export default {
    get: () => state,
    resetState,
    set,
    edit
}