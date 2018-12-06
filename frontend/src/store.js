import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const apiRoot = '';

const store = new Vuex.Store({
    state: {
        geneList: 'OOGIIIIIEEE'
    },
    mutations: {
    },
    actions: {
    },
});

export default store;
