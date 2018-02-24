import AuthService from './services/AuthService';

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: require('./components/home/HomeComponent.vue')
    },
    {
        path: '/login',
        component: require('./components/login/LoginComponent.vue'),
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next(false);
            } else {
                next();
            }
        }
    },
    {
        path: '/register',
        component: require('./components/register/RegisterComponent.vue'),
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next(false);
            } else {
                next();
            }
        }
    },
    {
        path: '/tasks',
        component: require('./components/task/TaskComponent.vue'),
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/done-tasks',
        component: require('./components/task/DoneTaskComponent.vue'),
        beforeEnter: (to, from, next) => {
            if (AuthService.loggedIn) {
                next();
            } else {
                next('/login');
            }
        }
    }
];