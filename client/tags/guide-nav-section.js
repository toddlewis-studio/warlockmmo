import Tag from '../services/tag.js'

const articleChangeEvent = article => new CustomEvent("articleChange", {detail: article})

export default new Tag(
    `
    <div class="guide-nav-section">
        <label id="name" class="larger"></label>
        <ul id="articles"></ul>
    </div>
    `,
    async (div, name, articles, articleDiv, closeOverNav) => {
        div.querySelector('#name').innerText = name
        const articlesDiv = div.querySelector('#articles')
        articles.forEach(article => {
            const li = document.createElement('li')
            const btn = document.createElement('button')
            btn.classList.add('guide-nav-article')
            btn.addEventListener('click', () => {
                articleDiv.dispatchEvent(articleChangeEvent(article))
                closeOverNav()
            })
            btn.innerText = article.name
            li.appendChild(btn)
            articlesDiv.appendChild(li)
        })
    }
)