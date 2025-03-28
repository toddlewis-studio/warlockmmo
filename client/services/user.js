import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

import routes from '../routes.js'
import gameState from './game-state.js'

class UserService {
    constructor() {
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDSPcHyBLUnGAgzTWNJRFiIx2AckHDVJcs",
            authDomain: "warlockmmo-45f22.firebaseapp.com",
            databaseURL: "https://warlockmmo-45f22-default-rtdb.firebaseio.com",
            projectId: "warlockmmo-45f22",
            storageBucket: "warlockmmo-45f22.firebasestorage.app",
            messagingSenderId: "253332095658",
            appId: "1:253332095658:web:0d0bfaab4ab0b3d5bf86d3",
            measurementId: "G-MJNYXPL5LN"          
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        this.provider = new GoogleAuthProvider();
        this.currentUser = null;
        // Initialize Firebase Analytics
        const analytics = getAnalytics(app);

        // Enable persistent auth state
        setPersistence(this.auth, browserLocalPersistence)
            .catch(error => console.error('Auth persistence error:', error))

        // Set up auth state listener
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser = user;
            this.onAuthStateChange(user);
        });

        this.initializedUser = false
    }

    // Callback for auth state changes
    async onAuthStateChange(user) {
        // Dispatch a custom event when auth state changes
        const event = new CustomEvent('authStateChanged', { 
            detail: { user } 
        });
        window.dispatchEvent(event);
        console.log('auth token loaded')
        try {
            await this.reloadUser()
        } catch(e){
            console.error(e)
        }
    }

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, this.provider);
            return result.user;
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    }

    // Sign out
    async signOut() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error('Sign-out error:', error);
            throw error;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.currentUser;
    }

    // Check for local authentication data
    async checkLocalAuth() {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                unsubscribe(); // Unsubscribe after first auth state change
                resolve(!!user);
            });
        });
    }

    async getAuthToken() {
      const user = this.auth.currentUser;
      if (!user) return null;
      return await user.getIdToken();
    };
    
    // Add this to your fetch calls
    async apiFetch (url, body, options = {}) {
        url = 'http://localhost:3001/' + url
      options.body = body
      const token = await this.getAuthToken();
      const method = options.body ? 'POST' : 'GET';
      const headers = {
        ...options.headers,
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const requestOptions = {
        ...options,
        method,
        headers
      };
      if (options.body) {
        requestOptions.body = JSON.stringify(options.body);
      }
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };

    async reloadUser(){
        const id = this.currentUser.uid;
        try {
            const res = await this.apiFetch('api/signin', {id})
            if(res.error) throw res
            console.log('reload user', res)
            gameState.set({userId: id, user: res.user, world: res.world})
            window.restartRoute()
        } catch (error) {
            routes.newUser.start()
            throw error
        }
    }

    async initUser(username){
        const id = this.currentUser.uid
        try {
            const res = await this.apiFetch('api/inituser', {id, username})
            console.log('init user', res)
            gameState.set({userId: id, user: res.user})
            await this.getLocation()
            routes.home.start()
        } catch (error) {
            throw error
        }
    }

    async getLocation() {
        const location = gameState.get().user.location
        try {
            const res = await this.apiFetch('api/getlocation', {
                territoryId: location.territory,
                nodeId: location.node
            })
            console.log('location', res)
            gameState.set({location: res})
            window.restartRoute()
        } catch (error) {
            throw error
        }
    }
}

// Export a singleton instance
export default new UserService();