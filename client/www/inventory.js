import Page from '../services/page.js'
import Nav from '../tags/nav.js'

let nav = Nav.place()

export default new Page( 'inventory',
    'Inventory',
    `
        ${nav.html}
        <main>
            <h1 class="header">
                <span>Bag</span>
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
        Nav.load(div, nav.id)
        Nav.tabactive('inventory')
    }
)