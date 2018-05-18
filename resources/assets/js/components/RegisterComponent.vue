<template>
    <div>
        <navigation-component></navigation-component>
        <div class="register-component">
            <h1>Registration</h1>
            <form @submit.prevent="register()" class="register-component__form">
                <input
                        v-model="name"
                        v-validate="'required|min:2'"
                        :class="{'input': true, 'is-danger': errors.has('name')}"
                        class="form-control" id="name" name="name"
                        type="text"
                        placeholder="Type your name..."/>
                <div class="register-component__form__alert-text">
                    <span v-show="errors.has('name')">{{ errors.first('name')}}</span>
                </div>
                <input
                        v-model="email"
                        v-validate="'required|email'"
                        :class="{'input': true, 'is-danger': errors.has('email')}"
                        class="form-control" id="email" name="email"
                        type="email"
                        placeholder="Type your email..."/>
                <div class="register-component__form__alert-text">
                    <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
                <input
                        v-model="password"
                        v-validate="'required|min:6'"
                        :class="{'input': true, 'is-danger': errors.has('password')}"
                        class="form-control"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Type your password..."/>
                <div class="register-component__form__alert-text">
                    <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
                </div>
                <input
                        v-model="password_c"
                        v-validate="'required|min:6|confirmed:password'"
                        :class="{'input': true, 'is-danger': errors.has('password_c')}"
                        class="form-control"
                        name="password_c"
                        id="password_c"
                        type="password"
                        placeholder="Type your password confirmation..."
                        data-vv-as="password confirmation"/>
                <div class="register-component__form__alert-text"><span v-show="errors.has('password_c')">
                    {{ errors.first('password_c') }}</span>
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action">Register
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
        <footer-component></footer-component>
    </div>
</template>
<script>
    import store from '../store/index';
    import {mapGetters} from 'vuex';
    import NavigationComponent from './NavigationComponent.vue';
    import FooterComponent from './FooterComponent.vue';

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_c: '',
            }
        },
        components: {
            'navigation-component' : NavigationComponent,
            'footer-component' : FooterComponent
        },
        methods: {
            register() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        store.dispatch('register', {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            password_c: this.password_c
                        }).then(() => {
                            this.clearInputs();
                            Materialize.toast('Registered!', 5000);
                            this.$router.push('/dashboard/tasks');
                        }).catch(error => {
                            if (error.response) {
                                if (error.response.status == 422) {
                                    const errors = Object.values(error.response.data.errors).map(error => {
                                        return '<li>' + error + '</li>'
                                    }).join();
                                    Materialize.toast('<ul>' + errors + '</ul>', 5000);
                                }
                            }
                        });
                    }
                });
            },
            clearInputs() {
                this.name = '';
                this.email = '';
                this.password = '';
                this.password_c = '';
            }
        },
    }
</script>