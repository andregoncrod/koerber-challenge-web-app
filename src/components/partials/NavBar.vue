<script>
export default {
    methods: {
        login() {
            this.$store.dispatch('auth0Login');
            console.log('we are in auth0Login');
        },
        logout() {
            this.$store.dispatch('auth0Logout');
            console.log('logging out');
        }
    }
};
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img id="logo" alt="Koerber logo" src="../../assets/logo.svg" />
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/challenge" class="nav-link">
                            Challenge
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            v-if="this.$store.state.userIsAuthorized"
                            to="/about"
                            class="nav-link"
                        >
                            About
                        </router-link>
                    </li>
                </ul>
                <div class="buttons">
                    <button
                        v-if="!this.$store.state.userIsAuthorized"
                        @click="login"
                        class="btn btn-primary"
                        type="button"
                    >
                        <strong>Sign In</strong>
                    </button>
                    <h5
                        id="logged-msg"
                        v-if="this.$store.state.userIsAuthorized"
                        class="is-size-3 has-background-dark welcome"
                    >
                        Welcome, {{ this.$store.state.userName }}!
                    </h5>
                    <button
                        id="logout"
                        v-if="this.$store.state.userIsAuthorized"
                        @click="logout"
                        class="btn btn-primary"
                        type="button"
                    >
                        <strong>Log out</strong>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
#logo {
    width: 85px;
}

#logout {
    float: left;
    margin-left: 15px;
}

#logged-msg {
    float: left;
    margin-bottom: 0;
    line-height: 38px;
}

#loading-info {
    float: left;
    margin-bottom: 0;
}
.router-link-active.router-link-exact-active {
    font-weight: bold;
}
.nav-link,
.nav-link:hover,
.nav-link:active,
.nav-link:visited {
    color: black;
}
</style>
