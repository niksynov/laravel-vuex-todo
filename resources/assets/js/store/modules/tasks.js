import tasks from '../../api/tasks';

const state = {
    tasks: [],
    activeTask: {
        id: null,
        text: null,
        done: null,
    },
};

const getters = {
    undoneTasks(state) {
        return state.tasks.filter(task => task.done == false);
    },
    doneTasks(state) {
        return state.tasks.filter(task => task.done == true);
    },
    activeTask(state) {
        return state.activeTask;
    }
};

const actions = {
    getTasks({commit}) {
        return new Promise((resolve, reject) => {
            tasks.getTasks().then(response => {
                commit('setTasks', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    createTask({commit}, text) {
        return new Promise((resolve, reject) => {
            tasks.createTask(text).then(response => {
                commit('createTask', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    markTaskAsDone({commit}, task) {
        return new Promise((resolve, reject) => {
            tasks.markTaskAsDone(task).then(response => {
                commit('markTaskAsDone', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    updateTask({commit}, task) {
        return new Promise((resolve, reject) => {
            tasks.updateTask(task).then(response => {
                commit('updateTask', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    deleteTask({commit}, task) {
        return new Promise((resolve, reject) => {
            tasks.deleteTask(task).then(response => {
                commit('deleteTask', task);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
};

const mutations = {

    setTasks(state, tasks) {
        state.tasks = tasks;
    },

    createTask(state, task) {
        const taskObj = {id: task.id, text: task.text, done: 0};
        state.tasks.push(taskObj);
    },

    markTaskAsDone(state, task) {
        const taskObj = state.tasks.find(stateTask => stateTask.id == task.id);
        Vue.set(taskObj, 'done', 1);
        console.log(taskObj, state.tasks);
    },

    updateTask(state, task) {
        console.log('ss', task);
        const taskObj = state.tasks.find(stateTask => stateTask.id == task.id);
        Vue.set(taskObj, 'text', task.text);
    },

    deleteTask(state, task) {
       state.tasks = state.tasks.filter(stateTask => stateTask.id != task.id);
    },

    updateTaskText(state, text) {
        state.activeTask.text = text;
    },

    setActiveTask(state, task) {
        state.activeTask = task;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};