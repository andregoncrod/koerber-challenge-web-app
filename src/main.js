import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import authStore from './auth/auth0-plugin';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(authStore);

app.mount('#app');
