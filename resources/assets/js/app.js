require('./bootstrap');

window.Vue = require('vue');

window.Event = new Vue();

import { routes } from './routes';

import Materials from "vue-materials";

const VueRouter = require('vue-router').default;

const VeeValidate = require('vee-validate');

Vue.use(VueRouter);

Vue.use(VeeValidate);

Vue.use(Materials);

Vue.component('navigation-component',
    require('./components/navigation/NavigationComponent.vue'));

const router = new VueRouter({
    routes,
});

const app = new Vue({
    el: '#app',
    router: router
});