<template>
  <div id="app">
    <nav class="">
      <ul>
        <li><router-link to="/">Facturación</router-link></li>
        <li><router-link to="/productos">Productos</router-link></li>
        <li><router-link to="/clientes">Clientes</router-link></li>
      </ul>
    </nav>
    <router-view /> <!-- Aquí se renderizarán los componentes según la ruta -->
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
