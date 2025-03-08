let state

const resetState = () => state = {
    userId: undefined,
    user: undefined,
    world: undefined
}
resetState()

const set = obj => Object.keys(obj).forEach(key => state[key] = obj[key])
const edit = async fn => state = await fn()

const getLocation = () => {
    if(state.world){
        const territory = state.world.territory[state.user.location.territory]
        const node = state.world.node[state.user.location.node]
        return {territory, node}
    }
}

export default {
    get: () => state,
    resetState,
    set,
    edit,
    getLocation
}