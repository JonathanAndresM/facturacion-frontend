<template>
    <div class="print-container">
      <h1>Factura {{ factura._id }}</h1>
      <p>Cliente: {{ factura.clienteId.nombre }}</p>
      <p>Total: {{ factura.total }}</p>
      <h2>Detalles</h2>
      <ul>
        <li v-for="detalle in factura.detalles" :key="detalle._id">
          Producto: {{ detalle.productoId.nombre }} - Cantidad: {{ detalle.cantidad }} - Precio: {{ detalle.precio }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      factura: Object
    }
  };
  </script>
  
  <style>
  @media print {
    .print-container {
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
  </style>