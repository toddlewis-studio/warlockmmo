import Tag from '../services/tag.js'

export default new Tag(
    `
    <div class="store-card">
        <b class="store-card-header" id="name"></b>
        <p class="store-card-text" id="desc"></p>
        <div class="store-card-cost" id="cost"></div>
    </div>
    `,
    async (div, storeCard) => {
        ['name', 'desc'].forEach(val => {
            div.querySelector(`#${val}`).innerText = storeCard[val]
        })

        storeCard.cost.forEach(([val, currency]) => {
            const cost = div.querySelector('#cost')
            const btn = document.createElement('button')
            btn.classList.add('store-card-purchase')
            btn.innerText = `${val} ${currency}`
            btn.addEventListener('click', () => {
                console.log('buy', val, currency)
            })
            cost.appendChild(btn)
        });
    }
)