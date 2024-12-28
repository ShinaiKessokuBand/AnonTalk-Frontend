// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
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
    }
  },
  getters: {
    currentUserId: state => state.currentUser ? state.currentUser.id : null
  }
});