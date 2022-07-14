import Vuex from 'vuex';
import auth0 from 'auth0-js';
import router from '../router';
import {
    domainAuth0,
    domainURLAuth0,
    clientId,
    domainURL
} from '../../auth_configs.json';

export default new Vuex.Store({
    state: {
        userIsAuthorized: false,
        userName: '',
        auth0: new auth0.WebAuth({
            domain: domainAuth0,
            clientID: clientId,
            redirectUri: domainURL + '/callback',
            responseType: 'token id_token',
            scope: 'openid profile email'
        })
    },
    mutations: {
        setUserIsAuthenticated(state, replacement) {
            state.userIsAuthorized = replacement;
        },
        setUserName(state, replacement) {
            state.userName = replacement;
        }
    },
    actions: {
        auth0Login(context) {
            console.log('in a store action named auth0Login');
            context.state.auth0.authorize();
        },
        auth0HandleAuthentication(context) {
            context.state.auth0.parseHash((err, authResult) => {
                if (
                    authResult &&
                    authResult.accessToken &&
                    authResult.idToken
                ) {
                    let expiresAt = JSON.stringify(
                        authResult.expiresIn * 1000 + new Date().getTime()
                    );
                    // save the tokens locally
                    localStorage.setItem(
                        'access_token',
                        authResult.accessToken
                    );
                    localStorage.setItem('id_token', authResult.idToken);
                    localStorage.setItem('expires_at', expiresAt);
                    localStorage.setItem(
                        'userName',
                        authResult.idTokenPayload.name
                    );

                    router.replace('/challenge');
                } else if (err) {
                    alert('login failed. Error #KJN838');
                    router.replace('/challenge');
                    console.log(err);
                }
            });
        },
        auth0Logout() {
            // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
            // Clear Access Token and ID Token from local storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            localStorage.removeItem('userName');

            // redirect to auth0 logout to completely log the user out
            window.location.href = `${domainURLAuth0}/v2/logout?client_id=${clientId}&returnTo=${domainURL}/logout`;
        }
    }
});
