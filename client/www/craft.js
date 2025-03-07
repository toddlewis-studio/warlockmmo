import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'

import Inventory from './inventory.js'

let nav = Nav.place()

export default new Page( 'craft',
    'Craft',
    `
        ${nav.html}
        <main>
            <h1 class="header">
                <span>Craft</span>
                <button id="inventory">Inventory</button>
            </h1>
        </main>
    `,
    async div => {

        div.querySelector('#inventory').addEventListener('click', () => Inventory.start())

        Nav.load(div, nav.id)
        Nav.tabactive(undefined)
    }
)