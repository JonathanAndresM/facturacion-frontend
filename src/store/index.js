import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
        state.user = null;
      }
  },
  actions: {
    async fetchUser({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
      try {
        const response = await axios.get('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error al obtener usuario', error);
        commit('clearUser');
      }
    }else{
        commit('clearUser');
    }
}
  },
  getters: {
    isAuthenticated: state => !!state.user,
    isAdmin: state => state.user?.role === 'admin',
    isGestionador: state => state.user?.role === 'gestionador' || state.user?.role === 'admin',
    isFacturador: state => state.user?.role === 'facturador' || state.user?.role === 'gestionador' || state.user?.role === 'admin'
  }
});