import Vue from 'vue'
import App from './App.vue'

import store from '././src/store.js';

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: h => h(App),
    store
});
