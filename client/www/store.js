import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'
import StoreCard from '../tags/store-card.js'

let nav = Nav.place()

const newScoreCard = (name, desc, cost, storeId) => {return {name, desc, cost, storeId, ui: StoreCard.place()}}
let storeCards = [
    newScoreCard('300 Spirit', 'Currency used to purchase items', [[9, 'USD']], 'spirit300'),
    newScoreCard('999 Spirit', 'Currency used to purchase items', [[18, 'USD']], 'spirit999'),
    newScoreCard('9 Pack: Reagents', 'Reagents used to craft items', [[90, 'Gold'], [45, 'Spirit']],'reagents9'),
    newScoreCard('36 Pack: Reagents', 'Reagents used to craft items', [[180, 'Gold'], [90, 'Spirit']],'reagents36'),
    newScoreCard('90 Pack: Reagents', 'Reagents used to craft items', [[450, 'Gold'], [300, 'Spirit']],'reagents90'),
]

export default new Page( 'store',
    'Store',
    `
        ${nav.html}
        <main>
            <h1 class="header">Store</h1>
            <div class="store-card-container">
                ${storeCards.map(card => card.ui.html).join('')}
            </div>
        </main>
    `,
    async div => {
        const user = userService.getCurrentUser();
        storeCards.forEach(card => StoreCard.load(div, card.ui.id, card))
        Nav.load(div, nav.id)
        Nav.tabactive('store')
    }
)