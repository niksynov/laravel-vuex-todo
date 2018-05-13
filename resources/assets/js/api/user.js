export default {
    getUser() {
        const token = localStorage.getItem('token');
        return axios.get('/api/user', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            return response.data;
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    Event.$emit('logout');
                }
            }
        });
    }
}