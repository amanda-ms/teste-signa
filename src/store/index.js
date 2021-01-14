import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
  },

  mutations: {
    seekFavorites(state, favorites) {
      state.favorites = favorites;
    },
  },

  actions: {
    async seekFavorites({ commit }, user) {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${user}/starred`
        );

        commit("seekFavorites", data);
      } catch (e) {
        throw e;
      }
    },
  },

  getters: {
    seekFavorites: (state) => state.favorites,
  },
});
