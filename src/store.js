import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    scrapbooks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setScrapbooks(state, scrapbooks) {
      state.scrapbooks = scrapbooks;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMyScrapbooks(context) {
      try {
        let response = await axios.get("/api/scrapbooks");
        context.commit('setScrapbooks', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async createScrapbook(context, data) {
      try {
        await axios.post('/api/scrapbooks', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    }

  }
})