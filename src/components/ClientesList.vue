<template>
    <div>
      <h1>Clientes</h1>
      <ul>
        <li v-for="cliente in clientes" :key="cliente._id">
          {{ cliente.nombre }} - {{ cliente.telefono }}
        </li>
      </ul>
      <h2>Agregar Cliente</h2>
      <form @submit.prevent="agregarCliente">
        <input v-model="nuevoCliente.nombre" placeholder="Nombre" required />
        <input v-model="nuevoCliente.direccion" placeholder="Dirección" />
        <input v-model="nuevoCliente.telefono" placeholder="Teléfono" />
        <input v-model="nuevoCliente.correo" placeholder="Correo" />
        <button type="submit">Agregar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ClientesList',
    data() {
      return {
        clientes: [],
        nuevoCliente: {
          nombre: '',
          direccion: '',
          telefono: '',
          correo: '',
        },
      };
    },
    methods: {
      async fetchClientes() {
        try {
          const response = await axios.get('http://localhost:5000/clientes');
          this.clientes = response.data;
        } catch (error) {
          console.error('Error al obtener clientes', error);
        }
      },
      async agregarCliente() {
        try {
          const response = await axios.post('http://localhost:5000/clientes', this.nuevoCliente);
          this.clientes.push(response.data);
          this.nuevoCliente = { nombre: '', direccion: '', telefono: '', correo: '' };
        } catch (error) {
          console.error('Error al agregar cliente', error);
        }
      },
    },
    created() {
      this.fetchClientes();
    },
  };
  </script>