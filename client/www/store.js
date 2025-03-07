import Page from '../services/page.js'
import userService from '../services/user.js'
import Nav from '../tags/nav.js'
import StoreCard from '../tags/store-card.js'

let nav = Nav.place()

const newScoreCard = (name, desc, cost, storeId) => {return {name, desc, cost, storeId, ui: StoreCard.place()}}
let storeCards = [
    newScoreCard('300 Spirit', 'Currency used to purchase items', [[9, 'USD']], 'spirit300'),
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
        storeCards.forEach(card => StoreCard.load(div, card.ui.id, card))
        Nav.load(div, nav.id)
        Nav.tabactive('store')
    }
)