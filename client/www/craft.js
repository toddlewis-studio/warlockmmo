import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'

let nav = Nav.place()

export default new Page( 'craft',
    'Craft',
    `
        ${nav.html}
        <main>
            <h1 class="header">Craft</h1>
        </main>
    `,
    async div => {
        const user = userService.getCurrentUser();

        Nav.load(div, nav.id)
        Nav.tabactive(undefined)
    }
)