import Tag from '../services/tag.js'
import gameState from '../services/game-state.js';

const fmtNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default new Tag(
    `
    <div class="tavern-view">
        <h1 id="name" class="j-center">Loading...</h1>
        <i class="smaller j-center">Tavern</i>
        <div class="tavern-options panel">
            <label><span id="online">9</span> Warlocks at <span id="territory"></span></label>
            <div>
                <button id="setSpawn" class="j-center">Set Spawnpoint</button>
            </div>
            <hr>
            <label>NPCs</label>
            <div id="npcs">
                <button class="j-center">John Doe</button>
            </div>
        </div>
    </div>
    `,
    async (div) => {
        div.querySelector('#name').innerText = gameState.getLocation().node.name
        div.querySelector('#territory').innerText = gameState.getLocation().territory.name
        div.querySelector('#online').innerText = fmtNum(Math.floor(Math.random() * 1000000) + 1)
        div.querySelector('#setSpawn').addEventListener('click', () => {

        })
    }
)