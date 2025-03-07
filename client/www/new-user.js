import Page from '../services/page.js'
import userService from '../services/user.js'
import shake from '../services/shake.js';

export default new Page( 'newUser',
    'New User',
    `
        <main>
            <h1 class="header">Initialize Account</h1>
            
            <form>
                <b id="email" class="larger"></b>
                <p>Create a username for your warlock.<br><i class="smaller">Must have at least 6 characters</i></p>
                <label>Warlock Username</label>
                <input id="username">
                <button id="submit" class="larger">Submit</button>
            </form>
        </main>
    `,
    async div => {
        const user = userService.currentUser;
        if (user) {
            div.querySelector('#email').innerText = user.email;
        }

        div.querySelector(`#submit`).addEventListener('click', async e => {
            e.preventDefault()
            const username = div.querySelector('#username')
            if(username.value.length < 6)
                shake(username)
            else {
                console.log(username)
                await userService.initUser(username.value)
                shake(username)
            }
        })
    }
)