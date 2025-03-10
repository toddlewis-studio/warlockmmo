import Tag from '../services/tag.js'
import tag from '../tags.js'
import gameState from '../services/game-state.js'

const worldCard = new Tag(`
    <div class="world-card">
        <label id="name"></label>
        <i>Tier <span id="tier"></span></i>
        <button id="open">Preview</button>
    </div>`,
    (div, territory, preview) => {
        const name = div.querySelector('#name')
        const tier = div.querySelector('#tier')
        const open = div.querySelector('#open')
        name.innerText = territory.name
        tier.innerText = territory.tier
        open.addEventListener('click', () => {
            preview()
        })
    }
)

const map = new Tag(`
    <div id="grid" class="j-center"></div>
    <div id="worldPanel" class="panel">
        <label><span id="t-count"></span> Territories</label>
    </div>
    `,
    async (div, close) => {
        const state = gameState.get()
        const location = gameState.getLocation()
        const {user, world} = state
        const {territory, node} = location
        const grid = div.querySelector('#grid')
        const worldPanel = div.querySelector('#worldPanel')
        const tcount = div.querySelector('#t-count')
        //grid
        grid.appendChild(tag.TravelMapGrid.clone(territory, close))
        //world
        tcount.innerText = Object.values(world.territory).length
        Object.values(world.territory).forEach(t => {
            if(territory.id === t.id) return
            worldPanel.appendChild(worldCard.clone(t, () => {
                grid.innerHTML = ''
                grid.appendChild(tag.TravelMapGrid.clone(t, close))
            }))
        })
    }
)

export default () => 
    tag.OverNav.open((content, close) => 
        content.appendChild(map.clone(close))
    )