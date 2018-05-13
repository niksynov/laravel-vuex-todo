import AuthService from './services/AuthService';

export const routes = [
    {
        path: '/',
        redirect: '/tasks'
    },
    {
        path: '/login',
        component: require('./components/LoginComponent.vue'),
    },
    {
        path: '/register',
        component: require('./components/RegisterComponent.vue'),
    },
    {
        path: '/tasks',
        component: require('./components/TaskComponent.vue'),
    }
];