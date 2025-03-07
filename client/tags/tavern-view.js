import Tag from '../services/tag.js'
import gameState from '../services/game-state.js';

export default new Tag(
    `
    <div class="tavern-view">
        <h1 id="name">Loading...</h1>
        <div>
            <button></button>
            <button>Set Spawnpoint</button>
        </div>
    </div>
    `,
    async (div) => {
        const state = gameState.get()
    }
)