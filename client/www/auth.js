import Page from '../services/page.js'
import userService from '../services/user.js'
import home from './home.js'

export default new Page( 'auth',
    'Auth',
    `
        <main>
            <h1 class="header">Welcome to Warlock MMO</h1>
            <button id="signin">Sign in with google</button>
        </main>
    `,
    async div => {
        div.querySelector('#signin').addEventListener('click', async () => {
            try{
                const user = await userService.signInWithGoogle()
                console.log('user', user)
                home.start(div)
            } catch(e){
                console.error(e)
            }
        })
    }
)