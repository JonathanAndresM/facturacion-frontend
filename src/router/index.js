import { createRouter, createWebHistory } from 'vue-router';
import LoginUser from '../components/LoginUser.vue';
import DashboardUser from '../components/DashboardUser.vue';
//import { useStore } from 'vuex'; // Si estás usando Vuex para el estado global
import Facturacion from '../components/FacturacionList.vue';
import Productos from '../components/ProductosList.vue';
import Clientes from '../components/ClientesList.vue'; // Asegúrate de que tienes un componente de Clientes

const routes = [
    { path: '/login', component: LoginUser },
    { path: '/dashboard', component: DashboardUser, meta: { requiresAuth: true } },
    { path: '/', component: Facturacion },
    { path: '/productos', component: Productos, meta: { requiresAuth: true } },
    { path: '/clientes', component: Clientes, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardar la ruta si no está autenticado
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;