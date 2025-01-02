// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    socket: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setSocket(state, socket) {
      state.socket = socket;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        commit('setCurrentUser', response.data.user);
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    connectSocket({ commit }) {
      const userId = localStorage.getItem('currentUserId');
      console.log('current user id:' + userId);
      commit('setCurrentUser', { id: userId });
      const socket = new WebSocket(`ws://localhost:8089/ws?userId=` + userId);
      socket.onopen = () => {
        console.log('WebSocket connected by store');
        commit('setSocket', socket);
      };
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  },
  getters: {
    currentUserId: state => state.currentUser ? state.currentUser.id : null
  }
});
