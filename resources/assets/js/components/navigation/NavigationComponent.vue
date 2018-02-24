<template>
    <div class="navigation-component">
        <router-link to="/home" v-if="!loggedIn">Home</router-link>
        <router-link to="/login" v-if="!loggedIn" class="app__navigation__route">Sign in</router-link>
        <router-link to="/register" v-if="!loggedIn">Sign up</router-link>
        <router-link to="/tasks" v-if="loggedIn">Tasks</router-link>
        <router-link to="/done-tasks" v-if="loggedIn">Done tasks</router-link>
        <div v-if="loggedIn" class="navigation-component__profile">
            <a v-on:click="expand"
               v-bind:class="this.expanded ? 'navigation-component__profile__parent-link-active' : ''">{{currentUserName}}</a>
            <div v-bind:class="this.expanded == true ? 'navigation-component__profile__menu__expanded' : 'navigation-component__profile__menu'">
                <a v-on:click="logout">Log-out</a>
            </div>
        </div>
    </div>
    <!--<nav>-->
    <!--<div class="nav-wrapper">-->
    <!--<ul id="nav-mobile" class="left hide-on-med-and-down">-->
    <!--<li><router-link to="/home" v-if="!loggedIn">Home</router-link></li>-->
    <!--<li> <router-link to="/login" v-if="!loggedIn" class="app__navigation__route">Sign in</router-link></li>-->
    <!--<li><router-link to="/register" v-if="!loggedIn">Sign up</router-link></li>-->
    <!--<li><router-link to="/tasks" v-if="loggedIn">Tasks</router-link></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--<div v-if="loggedIn" class="navigation-component__profile">-->
    <!--<a v-on:click="expand"-->
    <!--v-bind:class="this.expanded ? 'navigation-component__profile__parent-link-active' : ''">{{currentUser}}</a>-->
    <!--<div v-bind:class="this.expanded == true ? 'navigation-component__profile__menu__expanded' : 'navigation-component__profile__menu'">-->
    <!--<a v-on:click="logout">Log-out</a>-->
    <!--</div>-->
    <!--</div>-->
    <!--</nav>-->
</template>
<script>
    import Auth from '../../services/AuthService';
    import User from '../../services/UserService';

    export default {
        data() {
            return {
                expanded: false,
                loggedIn: Auth.loggedIn,
                currentUserName: ''
            }
        },
        methods: {
            expand() {
                this.expanded = !this.expanded;
            },
            logout() {
                Event.$emit('logout')
            },
        },
        mounted() {
            Event.$on('login', () => {
                this.loggedIn = Auth.loggedIn;
                User.getUser().then((user) => {
                    this.currentUserName = user.userName;
                });
                Materialize.toast('Logged In', 4000)
            });
            Event.$on('logout', () => {
                this.expanded = false;
                this.currentUserName = '';
                this.loggedIn = false;
                Auth.logOutUser();
                this.$router.push('/login');

                Materialize.Toast.removeAll();
                Materialize.toast('Logged Out', 4000)
            });
            if (this.loggedIn) {
                User.getUser().then((user) => {
                    this.currentUserName = user.userName;
                });
            }
        }
    }
</script>