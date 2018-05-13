export default {
    registerUser(userData) {
        return axios.post('/api/register', {
            email: userData.email,
            name: userData.name,
            password: userData.password,
            password_c: userData.password_c
        });
    },

    loginUser(userData) {
        return axios.post('/api/login', {
            email: userData.email,
            password: userData.password,
        });
    },

    getUser() {
        return axios.get('/api/user',
            {headers: {'Authorization': 'Bearer ' + this.getToken()}});
    },

    loggedIn() {
        return !!localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token)
    },

    destroyToken() {
        localStorage.removeItem('token')
    },

    getToken() {
        return localStorage.getItem('token');
    }

}