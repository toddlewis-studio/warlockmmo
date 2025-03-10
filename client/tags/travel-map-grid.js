import Tag from '../services/tag.js'
import tag from '../tags.js'
import gameState from '../services/game-state.js'

const isNodeThere = (x, y, territory) =>
    territory.nodes.find(node => node.x === x && node.y === y)

const nodeTooltip = new Tag(`
    <div>
        <label id="name"></label>
        <i id="type" class="smaller"></i>
    </div>
    `,
    (div, node) => {
        const name = div.querySelector('#name')
        const type = div.querySelector('#type')
        name.innerText = node.name
        type.innerText = node.type.toUpperCase()
    }
)

const NODE_COLOR = {
    tavern: ['b-luminate-g'],
    camp: ['b-light-r'],
    boss: ['b-blue'],
    arena: ['b-red'],
    raid: ['b-blue', 't-red'],
    pvpcamp: ['b-light-r', 't-red']
}

export default new Tag(`
    <div class="travel-map-grid">
        <h2 id="territory" class="t-luminate j-center"></h2>
        <div id="grid" class="map-grid"></div>
        <div id="travelmodal" class="dark-screen hidden">
            <div class="card">
                <label>Traveling...</label>
                <progress id="loading"></progress>
            </div>
        </div>
    </div>
    `,
    async (div, territory, close) => {
        const state = gameState.get()
        const location = gameState.getLocation()
        const {user, world} = state
        const userTerritory = location.territory
        const userNode = location.node
        const grid = div.querySelector('#grid')
        const isUserTerritory = userTerritory.id === territory.id
        const territoryName = div.querySelector('#territory')
        territoryName.innerText = territory.name
        const travelModal = div.querySelector('#travelmodal')
        const loadingProgress = div.querySelector('#loading')

        const openTravelModal = () => {
            travelModal.classList.remove('hidden')
        }

        //grid
        for(let x = 1; x <= 12; x++){
            for(let y = 1; y <= 12; y++){
                const isNode = isNodeThere(x, y, territory)
                let mapNode, isCurrentNode
                if(isNode) {
                    mapNode = world.node[isNode.nodeId]
                    if(mapNode.id === userNode.id && isUserTerritory) isCurrentNode = true
                }
                const el = document.createElement((isNode && !isCurrentNode) ? 'button' : 'span')
                
                if(isNode) {
                    el.classList.add(...NODE_COLOR[mapNode.type])
                    el.innerText = mapNode.type.substring(0, 1).toUpperCase()
                    el.appendChild(tag.Tooltip.clone(NODE_COLOR[mapNode.type], nodeTooltip.clone(mapNode)))

                    if(!isCurrentNode){
                        el.addEventListener('click', () => {
                            close()
                        })
                    }
                }
                else {el.classList.add('b-bg')}
                
                el.classList.add('map-node')
                el.style.left = (x-1) * 30 + 'px'
                el.style.top = (y-1) * 30 + 'px'
                grid.appendChild(el)
            }
        }
    }
)