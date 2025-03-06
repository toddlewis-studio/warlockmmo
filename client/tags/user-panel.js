import Tag from '../services/tag.js'

export default new Tag(
    `
    <div class="user-panel">
        <b id="username" class="larger"></b>
        <div>
            <span id="zone"></span>
            <span id="node"></span>
        </div>
    </div>
    `,
    async (div, user) => {
        div.querySelector('#username').innerText = user.username;
        div.querySelector('#zone').innerText = user.location.zone;
        div.querySelector('#node').innerText = user.location.node;
    }
)