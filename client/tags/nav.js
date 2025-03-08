import Tag from '../services/tag.js'
import routes from '../routes.js'

const Nav = new Tag(
    `
    <nav class="navbar">
        <button id="home">Home</button>
        <button id="inventory">Inventory</button>
        <button id="store">Store</button>
        <button id="guide">Guide</button>
    </nav>
    `,
    async div => {
        const clearActive = () =>
            div.querySelectorAll('button').forEach(btn => btn.classList.remove('active'))
        
        ;[['#home', routes.home], ['#store', routes.store], ['#inventory', routes.inventory], ['#guide', routes.guide]]
            .forEach(([id, route]) => {
                div.querySelector(id).addEventListener('click', () =>
                    route.start(document.querySelector('#app'))
                )
            })

        const nav = div.querySelector('nav')
        nav.addEventListener('tabactive', event => {
            clearActive()
            if(event.detail.id)
                nav.querySelector(`#${event.detail.id}`).classList.add('active')
        })
    }
)

Nav.tabactive = (id) => 
    document.querySelectorAll('nav').forEach(nav => 
        nav.dispatchEvent(new CustomEvent('tabactive', {detail: {id}}))
    )

export default Nav