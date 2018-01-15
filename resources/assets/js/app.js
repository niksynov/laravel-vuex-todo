/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Event = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const VueRouter = require('vue-router').default;
const VeeValidate = require('vee-validate');

Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.component('alert-component',
    require('./components/alert/AlertComponent.vue')
);

Vue.component('register-component',
    require('./components/register/RegisterComponent.vue')
);

Vue.component('navigation-component',
    require('./components/navigation/NavigationComponent.vue'));

const homeComponent = Vue.component('home-component', require('./components/home/HomeComponent.vue'));
const loginComponent = Vue.component('login-component', require('./components/login/LoginComponent.vue'));
const registerComponent = Vue.component('register-component', require('./components/register/RegisterComponent.vue'));
const taskComponent = Vue.component('task-component', require('./components/task/TaskComponent.vue'));

import AuthService from './services/AuthService';

const routes = [
    {
        path: '/home',
        component: homeComponent
    },
    {
        path: '/login',
        component: loginComponent,
        beforeEnter : (to, from, next) => {
            if (AuthService.loggedIn) {
                next(false);
            }
        }
    },
    {
        path: '/register',
        component: registerComponent,
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next(false);
            }
        }
    },
    {
        path: '/tasks',
        component: taskComponent,
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next();
            } else {
                next('/login');
            }
        }
    }
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router,
});

router.push('/home');