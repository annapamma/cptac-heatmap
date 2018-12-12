import Vue from 'vue'
import App from './App.vue'

import VueApexCharts from 'vue-apexcharts'
import { TileSpinner } from 'vue-spinners'

import store from '././src/store.js';
import JsonExcel from 'vue-json-to-excel';

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
Vue.component('downloadExcel', JsonExcel);
Vue.component('spinner', TileSpinner);

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: h => h(App),
    store
});
