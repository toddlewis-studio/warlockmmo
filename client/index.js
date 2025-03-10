import routes from './routes.js'
import userService from '../services/user.js'

const app = document.getElementById('app')
window.appEl = app

const init = async () => {
    await userService.checkLocalAuth()
    if(userService.isAuthenticated())
        routes.home.start(app)
    else
        routes.auth.start(app)
}
init()