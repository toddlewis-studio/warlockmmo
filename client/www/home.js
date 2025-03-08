import Page from '../services/page.js'
import userService from '../services/user.js'

import tag from '../tags.js'

import gameState from '../services/game-state.js'

let nav = tag.Nav.place()
let userpanel = tag.UserPanel.place()
let targetpanel = tag.TargetPanel.place()

export default new Page( 'home',
    'Home',
    `
        ${nav.html}
        <main>
            <div class="home-container">
                <div class="home-view" id="view">
                </div>
                <div class="home-menu">
                    ${userpanel.html}
                    <div class="home-actions">
                        <button id="travel">Travel</button>
                    </div>
                </div>
            </div>
        </main>
    `,
    async div => {
        const state = gameState.get()
        const user = state.user
        const location = gameState.getLocation()
        if (user) {
            tag.UserPanel.load(div, userpanel.id, user)
        }
        if(location) {
            if(location.node.type !== 'tavern')
                div.querySelector(`#view`).appendChild(
                    tag.TargetPanel.clone()
                )
            if(location.node.type === 'tavern')
                div.querySelector(`#view`).appendChild(
                    tag.TavernView.clone()
                )
        }

        div.querySelector('#travel')
            .addEventListener('click', () => tag.TravelMap())

        tag.Nav.load(div, nav.id)
        tag.Nav.tabactive('home')
    }
)