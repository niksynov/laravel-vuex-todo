<template>
    <div class="dashboard-component">
        <ul id="dashboard-sidenav" class="side-nav fixed">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg">
                    </div>
                    <a href="#"><img class="avatar-image"
                                          src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"></a>
                    <span class="white-text name">{{user.name}}</span>
                    <a href="#"><span class="white-text email">{{user.email}}</span></a>
                    <a href="#" v-on:click="logout">Logout</a>
                </div>
            </li>
            <li>
                <router-link to="/dashboard/tasks"><i class="material-icons">check_box</i>Tasks</router-link>
            </li>
            <li>
                <div class="divider"></div>
            </li>
        </ul>
        <a href="#" data-activates="dashboard-sidenav" class="button-collapse"><i class="material-icons">menu</i></a>
        <router-view></router-view>
    </div>
</template>
<script>
    import store from "../store/index";
    import {mapGetters, mapState} from 'vuex';

    export default {
        beforeRouteEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                store.dispatch("getUser").catch(error => {
                    if (error.response) {
                        this.checkResponse(error.response.status);
                    }
                });
                next();
            } else {
                next("/login");
            }
        },
        mounted() {
            store.dispatch('getUser').catch(error => {
                if (error.response) {
                    this.checkResponse(error.response.status);
                }
            });
            $(".button-collapse").sideNav();
        },
        methods: {
            logout() {
                store.dispatch('logout').then(() => {
                    this.$router.push('/login');
                    Materialize.toast('Logged out', 5000);
                });
            },
        },
        computed: {
            ...mapGetters({
                user: 'currentUser'
            }),
        },
    };
</script>
