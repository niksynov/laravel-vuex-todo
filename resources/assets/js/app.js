require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes';
import Materials from "vue-materials";
import store from './store';

Vue.use(VueRouter);

Vue.use(VeeValidate);

Vue.use(Materials);

const router = new VueRouter({
    routes,
});

new Vue({
    el: '#app',
    store,
    router: router
});