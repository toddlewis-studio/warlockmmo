import guid from './guid.js'

export default class {
    constructor(html, init) {
        this.template = document.createElement('template')
        this.template.innerHTML = html
        this.init = init;
    }
    place(){
        const id = guid()
        return {id, html: `<span id="${id}"></span>`}
    }
    load(div, id, ...params) {
        const clone = this.template.content.cloneNode(true);
        this.init(clone, ...params)
        const placeholder = (div?div:document).querySelector(`#${id}`)
        placeholder.parentElement.replaceChild(clone, placeholder)
    }
}