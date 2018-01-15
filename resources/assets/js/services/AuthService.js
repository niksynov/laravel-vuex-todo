class AuthService {
    loginUser({email, password}) {
        return axios.post('/api/login', {
            email,
            password,
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            return response;
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