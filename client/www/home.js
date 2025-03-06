import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'

let nav = Nav.place()

export default new Page( 'home',
    'Home',
    `
        ${nav.html}
        <main>
            <h1 class="header">Warlock MMO</h1>
            <p id="username"></p>
        </main>
    `,
    async div => {
        const user = userService.getCurrentUser();
        console.log(user)
        if (user) {
            div.querySelector('#username').innerText = user.username;
        }

        Nav.load(div, nav.id)
        Nav.tabactive('home')
    }
)