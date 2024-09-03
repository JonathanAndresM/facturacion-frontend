<template>
    <div>
      <h1>Productos</h1>
      <form @submit.prevent="crearProducto">
        <input v-model="nuevoProducto.nombre" placeholder="Nombre" required />
        <input v-model="nuevoProducto.descripcion" placeholder="Descripción" />
        <input v-model="nuevoProducto.precio" type="number" placeholder="Precio" required />
        <input v-model="nuevoProducto.cantidad" type="number" placeholder="Cantidad" required />
        <button type="submit">Agregar Producto</button>
      </form>
      
      <h2>Lista de Productos</h2>
      <ul>
        <li v-for="producto in productos" :key="producto._id">
          {{ producto.nombre }} - {{ producto.descripcion }} - Precio: {{ producto.precio }} - Cantidad: {{ producto.cantidad }}
          <button @click="eliminarProducto(producto._id)">Eliminar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productos: [],
        nuevoProducto: {
          nombre: '',
          descripcion: '',
          precio: 0,
          cantidad: 0
        }
      };
    },
    methods: {
      async fetchProductos() {
        try {
          const response = await axios.get('http://localhost:5000/productos');
          this.productos = response.data;
        } catch (error) {
          console.error('Error al obtener productos', error);
        }
      },
      async crearProducto() {
        try {
          await axios.post('http://localhost:5000/productos', this.nuevoProducto);
          this.fetchProductos();
          this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, cantidad: 0 };
        } catch (error) {
          console.error('Error al crear producto', error);
        }
      },
      async eliminarProducto(id) {
        try {
          await axios.delete(`http://localhost:5000/productos/${id}`);
          this.fetchProductos();
        } catch (error) {
          console.error('Error al eliminar producto', error);
        }
      }
    },
    created() {
      this.fetchProductos();
    }
  };
  </script>