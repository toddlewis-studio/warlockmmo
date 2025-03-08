import Page from '../services/page.js'
import articles from '../articles.js'

import tag from '../tags.js'

let nav = tag.Nav.place()

export default new Page( 'guide',
    'Guide',
    `
        ${nav.html}
        <main>
            <h1 class="header">
                <div class="guide-header">
                    <button class="square-icon-btn" id="openNav">?</button>
                    <span id="header">Guide</span>
                </div>
            </h1>
            <div class="guide-article" id="article"></div>
        </main>
    `,
    async div => {
        const articleDiv = div.querySelector('#article')
        const header = div.querySelector('#header')

        openNav.addEventListener('click', () => 
            tag.OverNav.open((content, close) => 
                Object.keys(articles).forEach(name => {
                    content.appendChild(
                        tag.GuideNavSection.clone(name, articles[name], articleDiv, close)
                    )
                })
            )
        )

        articleDiv.addEventListener('articleChange', event => {
            const article = event.detail
            articleDiv.innerHTML = ''
            header.innerText = article.name
            const date = document.createElement('i')
            date.innerText = article.date
            date.classList.add('smaller', 'article-date')
            articleDiv.appendChild(date)
            const text = document.createElement('div')
            text.classList.add('guide-text')
            text.innerText = article.content.join('\n')
            articleDiv.appendChild(text)
        })

        articleDiv.dispatchEvent(new CustomEvent( 'articleChange', {detail: articles.Updates[0]} ))

        tag.Nav.load(div, nav.id)
        tag.Nav.tabactive('guide')
    }
)