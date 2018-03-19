<template>
    <div id="login-component" class="login-component">
        <h1>Sign In</h1>
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
            <button type="submit">Sign in</button>
        </form>
    </div>
</template>
<script>
    import AuthService from '../../services/AuthService';
    import NavigationComponent from '../navigation/NavigationComponent.vue';
    export default {
        data() {
            return {
                email: '',
                password: '',
                router: this.$router
            }
        },
        methods: {
            login() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        const {email, password} = this;
                        AuthService.loginUser({email, password}).then((successResponse) => {
                            if (successResponse) {
                                this.$router.push('/tasks');
                                Event.$emit('login');
                            }
                        });
                    }
                });
            }
        }
    }
</script>