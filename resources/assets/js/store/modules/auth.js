import auth from '../../api/auth';

const state = {
    loggedIn: auth.loggedIn(),
    user: {},
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isLoggedIn(state) {
        return state.loggedIn && state.user;
    },
};

const actions = {
    register({commit}, userData) {
        return new Promise((resolve, reject) => {
            auth.registerUser(userData).then(response => {
                commit('setAuth', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    login({commit}, userData) {
        return new Promise((resolve, reject) => {
            auth.loginUser(userData).then(response => {
                commit('setAuth', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    getUser({commit}) {
        return new Promise((resolve, reject) => {
            auth.getUser().then(response => {
                commit('setAuth', response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    logout({commit}) {
        commit('setLogout');
    }
};

const mutations = {
    setAuth(state, user) {
        state.user = user;
        state.loggedIn = true;
        auth.setToken(state.user.token);
    },
    setLogout(state) {
        state.user = {};
        state.loggedIn = false;
        auth.destroyToken();
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};