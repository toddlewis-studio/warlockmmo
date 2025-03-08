import Tag from '../services/tag.js'

const overNav = new Tag(
    `
    <div class="dark-screen" id="screen">
        <div class="overnav" id="content"></div>
    </div>
    `,
    async (div) => {
        const screen = div.querySelector('#screen')
        const content = div.querySelector('#content')

        screen.closeNav = () => {
            screen.classList.add('death')
            content.classList.add('death')
            setTimeout(() => screen.parentElement.removeChild(screen), 180)
        }
        screen.addEventListener('click', () => screen.closeNav())

        content.addEventListener('click', event =>
            event.stopPropagation()
        )
    }
)

overNav.open = fn => {
    const clone = overNav.clone()
    const screen = clone.querySelector('#screen')
    const content = clone.querySelector('#content')
    fn(content, screen.closeNav)
    document.querySelector('#app').appendChild(clone)
    setTimeout(() => content.classList.add('active'), 300)
    return clone
}

export default overNav