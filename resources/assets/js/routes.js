import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';
import TaskComponent from './components/TaskComponent.vue';

export const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        component: LoginComponent,
    },
    {
        path: '/register',
        component: RegisterComponent,
    },
    {
        path: '/dashboard',
        redirect: '/dashboard/tasks',
        component: DashboardComponent,
        children: [
            {
                path: 'tasks',
                component: TaskComponent
            }
        ]
    }
];