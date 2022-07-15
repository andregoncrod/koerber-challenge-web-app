import { createRouter, createWebHistory } from 'vue-router';
import AuthStore from '../auth/auth0-plugin';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/logout',
            name: 'logout',
            redirect: '/challenge'
        },
        {
            path: '/callback',
            name: 'callback',
            component: () => import('../views/Auth0Callback.vue')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/challenge',
            name: 'challenge',
            component: () => import('../views/ChallengeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

//https://github.com/DedicatedManagers/vue-auth0-with-vuex-vue-router/blob/master/src/router.js
router.beforeEach((to, from, next) => {
    // Allow finishing callback url for logging in
    if (to.matched.some((record) => record.path == '/callback')) {
        console.log('router.beforeEach found /callback url');
        AuthStore.dispatch('auth0HandleAuthentication');
        next(false);
    }

    // check if user is logged in (start assuming the user is not logged in = false)
    let routerAuthCheck = false;
    // Verify all the proper access variables are present for proper authorization
    if (
        localStorage.getItem('access_token') &&
        localStorage.getItem('id_token') &&
        localStorage.getItem('expires_at')
    ) {
        console.log('found local storage tokens');
        // Check whether the current time is past the Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // set localAuthTokenCheck true if unexpired / false if expired
        routerAuthCheck = new Date().getTime() < expiresAt;
    }

    AuthStore.commit(
        'setUserName',
        localStorage.getItem('userName') ? localStorage.getItem('userName') : ''
    );

    AuthStore.commit(
        'setNickName',
        localStorage.getItem('nickName') ? localStorage.getItem('nickName') : ''
    );

    AuthStore.commit('setUserIsAuthenticated', routerAuthCheck);

    // check if the route to be accessed requires authorizaton
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Check if user is Authenticated
        if (routerAuthCheck) {
            // user is Authenticated - allow access
            next();
        } else {
            // user is not authenticated - redirect to login
            router.replace('/');
        }
    }
    // Allow page to load
    else {
        next();
    }
});

export default router;
