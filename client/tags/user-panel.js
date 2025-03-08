import Tag from '../services/tag.js'
import gameState from '../services/game-state.js';

export default new Tag(
    `
    <div class="user-panel">
        <b id="username" class="larger"></b>
        <div id="node">Loading...</div>
        <div id="territory" class="smaller">Loading...</div>
    </div>
    `,
    async (div) => {
        const state = gameState.get()
        const user = state.user
        const location = gameState.getLocation()
        if(user){
            div.querySelector('#username').innerText = user.username;
        }
        if(location){
            div.querySelector('#territory').innerText = location.territory.name;
            div.querySelector('#node').innerText = location.node.name;
        }
    }
)