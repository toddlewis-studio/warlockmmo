export default class {
    constructor(route, title, html, init) {
        this.route = route
        this.title = title;
        this.html = html;
        this.init = init;
    }
    async start(div) {
        window.currentRoute = this.route
        document.title = `Warlock MMO | ${this.title}`
        if(!div) div = document.querySelector('#app')
        div.innerHTML = this.html
        await this.init(div)
    }
}