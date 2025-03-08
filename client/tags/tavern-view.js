import Tag from '../services/tag.js'
import gameState from '../services/game-state.js';

export default new Tag(
    `
    <div class="tavern-view">
        <h1 id="name" class="j-center">Loading...</h1>
        <i class="smaller j-center">Tavern</i>
        <div class="tavern-options panel">
            <label><span id="online">9</span> Warlocks</label>
            <div>
                <button id="chat" class="j-center">Chat</button>
                <button id="setSpawn" class="j-center">Set Spawnpoint</button>
            </div>
            <hr>
            <label>NPCs</label>
            <div>
                <button class="j-center">John Doe</button>
            </div>
        </div>
    </div>
    `,
    async (div) => {
        div.querySelector('#name').innerText = gameState.getLocation().node.name
    }
)