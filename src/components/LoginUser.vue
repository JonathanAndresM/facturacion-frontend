<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Nombre de usuario" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    setup() {
      const router = useRouter();
  
      const login = async () => {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', {
            username: this.username,
            password: this.password
          });
          localStorage.setItem('token', response.data.token);
          router.push('/dashboard');
        } catch (error) {
          console.error('Error al iniciar sesión', error);
        }
      };
  
      return { login };
    }
  };
  </script>
  
  <style>
  /* Puedes agregar estilos aquí */
  </style>
  