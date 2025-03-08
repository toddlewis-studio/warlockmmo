import Tag from '../services/tag.js'
import tag from '../tags.js'
import gameState from '../services/game-state.js'

const isNodeThere = (x, y, territory) =>
    territory.nodes.find(node => node.x === x && node.y === y)

const nodeTooltip = new Tag(`
    <div id="container">
        <label id="name"></label>
        <i id="type" class="smaller"></i>
    </div>
    `,
    (div, node) => {
        const container = div.querySelector('#container')
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

const map = new Tag(`
    <h2 id="currentNode" class="t-luminate-g j-center"></h2>
    <div class="j-center">
        <div id="grid" class="map-grid"></div>
    </div>
    <div id="worldPanel" class="panel"></div>
    `,
    async (div, close) => {
        const state = gameState.get()
        const location = gameState.getLocation()
        const {user, world} = state
        const {territory, node} = location
        const grid = div.querySelector('#grid')
        const worldPanel = div.querySelector('#worldPanel')
        const currentNode = div.querySelector('#currentNode')
        currentNode.innerText = node.name
        //grid
        for(let x = 1; x <= 12; x++){
            for(let y = 1; y <= 12; y++){
                const isNode = isNodeThere(x, y, territory)
                let mapNode, isCurrentNode
                if(isNode) {
                    mapNode = world.node[isNode.nodeId]
                    if(mapNode.id === node.id) isCurrentNode = true
                }
                const el = document.createElement((isNode && !isCurrentNode) ? 'button' : 'span')
                
                if(isNode) {
                    el.classList.add(...NODE_COLOR[mapNode.type])
                    el.innerText = node.type.substring(0, 1).toUpperCase()
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
        //world
    }
)

export default () => 
    tag.OverNav.open((content, close) => 
        content.appendChild(map.clone(close))
    )