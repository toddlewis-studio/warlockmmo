import Tag from '../services/tag.js'
import gameState from '../services/game-state.js';

export default new Tag(
    `
    <div class="target-panel">
        <div class="panel">
            <b class="larger">Demons</b>
        </div>
        <div class="panel">
            <b class="larger">Party</b>
        </div>
        <div class="panel">
            <b class="larger">Warlocks</b>
        </div>
        <div class="panel">
            <b class="larger">Monsters</b>
        </div>
    </div>
    `,
    async (div) => {
        const state = gameState.get()
    }
)