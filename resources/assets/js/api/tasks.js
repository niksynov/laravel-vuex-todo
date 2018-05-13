import auth from './auth';

export default {
    getTasks() {
        return axios.get('/api/user/task',
            {headers: {'Authorization': 'Bearer ' + auth.getToken()}});
    },
    createTask(text) {
        return axios.post('/api/user/task', {text}, {
            headers: {'Authorization': 'Bearer ' + auth.getToken()}
        });
    },
    markTaskAsDone(task) {
        return axios.post('/api/user/task/' + task.id + '/done', {}, {
            headers: {'Authorization': 'Bearer ' + auth.getToken()}
        });
    },
    updateTask(task) {
        return axios.put('/api/user/task/' + task.id, {text: task.text}, {
            headers: {'Authorization': 'Bearer ' + auth.getToken()}
        });
    },
    deleteTask(task) {
        return axios.delete('/api/user/task/' + task.id , {
            headers: {'Authorization': 'Bearer ' + auth.getToken()}
        });
    }
}