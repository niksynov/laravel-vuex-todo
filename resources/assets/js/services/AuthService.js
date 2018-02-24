class AuthService {
    loginUser({email, password}) {
        return axios.post('/api/login', {
            email,
            password,
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            return response;
        }).catch(function (error) {
            if (error.response.status == 401) {
                Materialize.toast('Incorrect email or password', 4000);
            } else {
                Materialize.toast('Error!', 4000);
                console.log(error);
            }
        });
    }

    logOutUser() {
        localStorage.removeItem('token');
    }

    get loggedIn() {
        return !!localStorage.getItem('token');
    }
}

export default new AuthService();