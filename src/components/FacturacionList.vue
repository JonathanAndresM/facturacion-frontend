<template>
  <div class="container">
    <h1 class="my-4">Crear Factura</h1>
    <form @submit.prevent="crearFactura">
      <div class="mb-3">
        <label for="cliente" class="form-label">Cliente:</label>
        <select v-model="factura.clienteId" class="form-select" required>
          <option v-for="cliente in clientes" :key="cliente._id" :value="cliente._id">
            {{ cliente.nombre }}
          </option>
        </select>
      </div>
      
      <div v-for="(detalle, index) in factura.detalles" :key="index" class="mb-3">
        <h3>Detalle {{ index + 1 }}</h3>
        <div class="mb-2">
          <label for="producto" class="form-label">Producto:</label>
          <select v-model="factura.detalles[index].productoId" @change="actualizarPrecio(index)" class="form-select" required>
            <option v-for="producto in productos" :key="producto._id" :value="producto._id">
              {{ producto.nombre }}
            </option>
          </select>
        </div>
        <div class="mb-2">
          <label for="cantidad" class="form-label">Cantidad:</label>
          <input v-model="factura.detalles[index].cantidad" type="number" class="form-control" placeholder="Cantidad" min="1" required />
        </div>
        <div class="mb-2">
          <label for="precio" class="form-label">Precio:</label>
          <input v-model="factura.detalles[index].precio" type="number" class="form-control" placeholder="Precio" readonly />
        </div>
        <button @click.prevent="eliminarDetalle(index)" class="btn btn-danger">Eliminar</button>
      </div>
      <button @click.prevent="agregarDetalle" class="btn btn-primary">Agregar Detalle</button>
      <button type="submit" class="btn btn-success">Crear Factura</button>
    </form>

    <h1 class="my-4">Facturas</h1>
    <ul class="list-group">
      <li v-for="factura in facturas" :key="factura._id" class="list-group-item">
        Factura {{ factura._id }} - Total: {{ factura.total }}
        <button @click="verDetalles(factura._id)" class="btn btn-info btn-sm float-end">Ver Detalles</button>
      </li>
    </ul>

    <div v-if="facturaDetalles" class="mt-4">
      <h2>Detalles de Factura {{ facturaDetalles.factura._id }}</h2>
      <ul class="list-group">
        <li v-for="detalle in facturaDetalles.detalles" :key="detalle._id" class="list-group-item">
          Producto: {{ detalle.productoId.nombre }} - Cantidad: {{ detalle.cantidad }} - Precio: {{ detalle.precio }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientes: [],
        productos: [],
        factura: {
          clienteId: '',
          detalles: []
        },
        facturas: [],
        facturaDetalles: null
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
      async fetchProductos() {
        try {
          const response = await axios.get('http://localhost:5000/productos');
          this.productos = response.data;
        } catch (error) {
          console.error('Error al obtener productos', error);
        }
      },
      async fetchFacturas() {
        try {
          const response = await axios.get('http://localhost:5000/facturas');
          this.facturas = response.data;
        } catch (error) {
          console.error('Error al obtener facturas', error);
        }
      },
      async crearFactura() {
        try {
          await axios.post('http://localhost:5000/facturas', this.factura);
          this.fetchFacturas();
          this.factura = { clienteId: '', detalles: [] };
        } catch (error) {
          console.error('Error al crear factura', error);
        }
      },
      async verDetalles(id) {
        try {
          const response = await axios.get(`http://localhost:5000/facturas/${id}`);
          this.facturaDetalles = response.data;
        } catch (error) {
          console.error('Error al obtener detalles de la factura', error);
        }
      },
      agregarDetalle() {
        this.factura.detalles.push({
          productoId: '',
          cantidad: 1,
          precio: 0
        });
      },
      eliminarDetalle(index) {
        this.factura.detalles.splice(index, 1);
      },
      async actualizarPrecio(index) {
        try {
          const productoId = this.factura.detalles[index].productoId;
          const producto = this.productos.find(p => p._id === productoId);
          this.factura.detalles[index].precio = producto ? producto.precio : 0;
        } catch (error) {
          console.error('Error al actualizar el precio', error);
        }
      }
    },
    created() {
      this.fetchClientes();
      this.fetchProductos();
      this.fetchFacturas();
    }
  };
  </script>