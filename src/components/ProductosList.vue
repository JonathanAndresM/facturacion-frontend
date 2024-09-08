<template>
  <div>
    <h1>Productos</h1>
    <form @submit.prevent="crearProducto">
      <input v-model="nuevoProducto.nombre" placeholder="Nombre" required />
      <input v-model="nuevoProducto.descripcion" placeholder="Descripción" />
      <input v-model="nuevoProducto.precio" type="number" placeholder="Precio" required />
      <input v-model="nuevoProducto.cantidad" type="number" placeholder="Cantidad" required />
      <button type="submit" class="btn btn-primary">Agregar Producto</button>
    </form>

    <h2>Lista de Productos</h2>
    <ul>
      <li v-for="producto in productos" :key="producto._id">
        {{ producto.nombre }} - {{ producto.descripcion }} - Precio: {{ producto.precio }} - Cantidad: {{
          producto.cantidad }}
        <button @click="editarProducto(producto)" class="btn btn-warning btn-sm float-end">Editar</button>
        <button @click="eliminarProducto(producto._id)" class="btn btn-warning btn-sm float-end">Eliminar</button>
      </li>
    </ul>
    <!-- Formulario de edición de productos -->
    <div v-if="productoEditado" class="mt-4">
      <h2>Editar Producto</h2>
      <form @submit.prevent="actualizarProducto">
        <input v-model="productoEditado.nombre" placeholder="Nombre" required />
        <input v-model="productoEditado.descripcion" placeholder="Descripción" />
        <input v-model="productoEditado.precio" type="number" placeholder="Precio" required />
        <input v-model="productoEditado.cantidad" type="number" placeholder="Cantidad" required />
        <button type="submit" class="btn btn-success">Actualizar Producto</button>
      </form>
    </div>
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
      },
      productoEditado: null
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
    async editarProducto(producto) {
      this.productoEditado = { ...producto };
    },
    async actualizarProducto() {
      try {
        await axios.put(`http://localhost:5000/productos/${this.productoEditado._id}`, this.productoEditado);
        this.fetchProductos();
        this.productoEditado = null;
      } catch (error) {
        console.error('Error al actualizar producto', error);
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