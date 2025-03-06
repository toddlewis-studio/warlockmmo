import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'
import UserPanel from '../tags/user-panel.js'

let nav = Nav.place()
let userpanel = UserPanel.place()

export default new Page( 'home',
    'Home',
    `
        ${nav.html}
        <main>
            <div class="home-container">
                <div class="home-view">
                    <div class="home-view-targeting-panels">
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
                </div>
                <div class="home-menu">
                    ${userpanel.html}
                    <div class="home-actions">
                        <button>Map</button>
                    </div>
                </div>
            </div>
        </main>
    `,
    async div => {
        const user = userService.getCurrentUser();
        if (user) {
            UserPanel.load(div, userpanel.id, user)
        }

        Nav.load(div, nav.id)
        Nav.tabactive('home')
    }
)