import Tag from '../services/tag.js'

export default new Tag(
    `<div id="tooltip" class="tooltip"></div>`,
    (div, classAr, content) => {
        const tooltip = div.querySelector('#tooltip')
        tooltip.classList.add(classAr)
        tooltip.appendChild(content)
    }
)