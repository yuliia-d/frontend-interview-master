import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: 'Bob Razowski',
      apiToken: '273b9080',
    },
    token: '273b9080',
  },
  getters: {
    userName: (state) => state.user.name,
    token: (state) => state.token,
  },
});
