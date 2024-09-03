import { createRouter, createWebHistory } from 'vue-router';
import Facturacion from '../components/FacturacionList.vue';
import Productos from '../components/ProductosList.vue';
import Clientes from '../components/ClientesList.vue'; // Asegúrate de que tienes un componente de Clientes

const routes = [
  { path: '/', component: Facturacion },
  { path: '/productos', component: Productos },
  { path: '/clientes', component: Clientes }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;