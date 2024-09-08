import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { BootstrapVue3 } from 'bootstrap-vue-3';

const app = createApp(App);
app.use(router);
app.use(store); // Usa el store en la aplicación
app.use(BootstrapVue3);
// Verifica si hay un token y carga el estado del usuario
store.dispatch('fetchUser');
app.mount('#app');
