<template>
    <div id="login-component" class="login-component">
        <h1>Log In</h1>
        <form @submit.prevent="login()" class="login-component__form">
            <input
                    v-model="email"
                    v-validate="'required|email'"
                    name="email"
                    :class="{'input': true, 'is-danger': errors.has('email')}"
                    class="form-control"
                    id="email"
                    type="email"
                    placeholder="Type your email..."/>
            <div class="login-component__form__alert-text">
                <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <input
                    v-model="password"
                    v-validate="'required|min:6'"
                    name="password"
                    :class="{'input': true, 'is-danger': errors.has('password')}"
                    class="form-control"
                    id="password"
                    type="password"
                    placeholder="Type your password..."/>
            <div class="login-component__form__alert-text">
                <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Log In
                <i class="material-icons right">send</i>
            </button>
            <router-link to="/register">Do not have account?</router-link>
        </form>
    </div>
</template>
<script>
    import store from '../store';
    import NavigationComponent from './NavigationComponent.vue';
    import FooterComponent from './FooterComponent.vue';

    export default {
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            login() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        store.dispatch('login', {
                            email: this.email,
                            password: this.password,
                        }).then(() => {
                            this.clearInputs();
                            Materialize.toast('Logged in!', 5000);
                            this.$router.push('/tasks');
                        }).catch(error => {
                            const errors = Object.values(error.response.data.errors).map(error => {
                                return '<li>' + error + '</li>'
                            }).join();
                            Materialize.toast('<ul>' + errors + '</ul>', 5000);
                        });
                    }
                });
            },
            clearInputs() {
                this.email = '';
                this.password = '';
            }
        }
    }
</script>