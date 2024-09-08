<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="isAdmin">Eres un Administrador</p>
    <p v-if="isGestionador">Eres un Gestionador</p>
    <p v-if="isFacturador">Eres un Facturador</p>
  </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    //const user = store.state.user;
    // Sección para verificar autenticación y roles
    const isAdmin = computed(() => store.getters.isAdmin);
    const isGestionador = computed(() => store.getters.isGestionador);
    const isFacturador = computed(() => store.getters.isFacturador);

    // Opcional: Puedes verificar autenticación aquí y redirigir si no está autenticado
    if (!store.getters.isAuthenticated) {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado
      this.router.push('/login');
    }

    return { isAdmin, isGestionador, isFacturador };
  }
};
</script>

<style>
/* Puedes agregar estilos aquí */
</style>