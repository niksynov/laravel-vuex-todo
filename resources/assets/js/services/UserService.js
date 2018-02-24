class UserService {

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

    getUserTasks() {
        const token = localStorage.getItem('token');
        return axios.get('/api/user/task', {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            return response.data
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    Event.$emit('logout');
                }
            }
        });
    }

    getUserDoneTasks() {
        const token = localStorage.getItem('token');
        return axios.get('/api/user/task/done', {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            return response.data
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status == 401) {
                    Event.$emit('logout');
                }
            }
        });
    }

    createUserTask(text) {
        const token = localStorage.getItem('token');
        return axios.post('/api/user/task', {text}, {
            headers: {'Authorization': 'Bearer ' + token}
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

    markTaskAsDone(id) {
        const token = localStorage.getItem('token');
        return axios.post('/api/user/task/' + id + '/done', {}, {
            headers: {'Authorization': 'Bearer ' + token}
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

    editTask(id, text) {
        const token = localStorage.getItem('token');
        return axios.put('/api/user/task/' + id , { text }, {
            headers: {'Authorization': 'Bearer ' + token}
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

    removeTask(id) {
        const token = localStorage.getItem('token');
        return axios.delete('/api/user/task/' + id , {
            headers: {'Authorization': 'Bearer ' + token}
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

export default new UserService();