<template>
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
            <div class="register-component__form__alert-text"><span v-show="errors.has('name')">{{ errors.first('name') }}</span></div>
            <input
                    v-model="email"
                    v-validate="'required|email'"
                    :class="{'input': true, 'is-danger': errors.has('email')}"
                    class="form-control" id="email" name="email"
                    type="text"
                    placeholder="Type your email..."/>
            <div class="register-component__form__alert-text"><span v-show="errors.has('email')">{{ errors.first('email') }}</span></div>
            <input
                    v-model="password"
                    v-validate="'required|min:6'"
                    :class="{'input': true, 'is-danger': errors.has('password')}"
                    class="form-control"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Type your password..."/>
            <div class="register-component__form__alert-text"><span v-show="errors.has('password')">{{ errors.first('password') }}</span></div>
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
            <div class="register-component__form__alert-text"><span v-show="errors.has('password_c')">{{ errors.first('password_c') }}</span></div>
            <button type="submit">Sign up</button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_c: '',
                validated: false
            }
        },
        methods: {
            register() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        axios.post('/api/register', {
                            email: this.email,
                            name: this.name,
                            password: this.password,
                            password_c: this.password_c
                        }).then(function (response) {
                            Event.$emit('displaySuccess', response.data.message);
                        }).catch(function (error) {
                            Event.$emit('displayError', error.message);
                        });
                    }
                });
            }
        }
    }
</script>