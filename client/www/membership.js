import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'
import StoreCard from '../tags/store-card.js'

let nav = Nav.place()

const newScoreCard = (name, desc, cost, storeId) => {return {name, desc, cost, storeId, ui: StoreCard.place()}}
let storeCards = [
    newScoreCard('30 day', 'Get membership for 30 days', [[6.66, 'USD']], 'member30'),
    newScoreCard('365 day', 'Get membership for 365 days\n(2 free months)', [[66.66, 'USD']], 'member365'),
]

export default new Page( 'membership',
    'Membership',
    `
        ${nav.html}
        <main>
            <h1 class="header">Membership</h1>
            <div class="store-card-container">
                ${storeCards.map(card => card.ui.html).join('')}
            </div>
        </main>
    `,
    async div => {
        storeCards.forEach(card => StoreCard.load(div, card.ui.id, card))
        Nav.load(div, nav.id)
    }
)