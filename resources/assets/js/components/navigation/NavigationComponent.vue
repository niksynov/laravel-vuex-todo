<template>
    <div class="navigation-component">
        <router-link to="/home">Home</router-link>
        <router-link to="/login" v-if="!loggedIn" class="app__navigation__route">Sign in</router-link>
        <router-link to="/register" v-if="!loggedIn">Sign up</router-link>
        <router-link to="/tasks" v-if="loggedIn">Tasks</router-link>
        <div v-if="loggedIn" class="navigation-component__profile">
            <a v-on:click="expand"
               v-bind:class="this.expanded ? 'navigation-component__profile__parent-link-active' : ''">Profiles</a>
            <div v-bind:class="this.expanded == true ? 'navigation-component__profile__menu__expanded' : 'navigation-component__profile__menu'">
                <a v-on:click="logout">Log-out</a>
            </div>
        </div>
    </div>
</template>

<script>

    import Auth from '../../services/AuthService';

    export default {
        data() {
            return {
                expanded: false,
                loggedIn: Auth.loggedIn
            }
        },
        methods: {
            expand() {
                this.expanded = !this.expanded;
            },
            logout() {
                this.expand();
                this.loggedIn = false;
                Auth.logOutUser();
                this.$router.push('/login');
                Event.$emit('displaySuccess', 'Logged Out');
            },
        },
        mounted() {
            Event.$on('login', () => {
                this.loggedIn = Auth.loggedIn
            });
        }
    }
</script>