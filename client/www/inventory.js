import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'
import Craft from './craft.js'

let nav = Nav.place()

export default new Page( 'inventory',
    'Inventory',
    `
        ${nav.html}
        <main>
            <h1 class="header">
                <span>Inventory</span>
                <button id="craft">Craft</button>
            </h1>
            <div>
                <div>
                    <b>Character</b>
                </div>
                <div>
                    <b>Items</b>
                </div>
            </div>
        </main>
    `,
    async div => {
        const user = userService.getCurrentUser();

        div.querySelector('#craft').addEventListener('click', () => Craft.start())

        Nav.load(div, nav.id)
        Nav.tabactive('inventory')
    }
)