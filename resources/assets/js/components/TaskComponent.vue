<template>
    <div class="task-component">
        <img class="avatar-image" src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png">
        <br>
        <span>{{user.email}}</span>
        <br>
        <a href="#" v-on:click="logout">Logout</a>
        <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input v-model="taskText" v-on:keyup.enter="createTask" id="task-text" type="text"
                   class="task-text validate">
            <label for="task-text">Task text</label>
        </div>
        <div v-if="!tasksLoaded" class="loading">Loading tasks...</div>
        <ul v-if="tasksLoaded && tasks.length > 0" class="collection">
            <li data-activates="slide-out" class="collection-item tasks"
                v-for="task in tasks"
                v-on:dblclick="taskDoubleClicked"
                @click="setActiveTask(task)"
                :class="{active: activeTask === task }">
                {{task.text}}
                <a class="secondary-content">
                    <i v-on:click="markTaskAsDone(task)" class="material-icons">
                        check_box_outline_blank
                    </i>
                </a>
            </li>
        </ul>
        <button v-if="tasksLoaded && doneTasks.length > 0" v-on:click="doneTasksSeen = !doneTasksSeen"
                class="btn waves-effect waves-light">Load done tasks
        </button>
        <ul v-if="doneTasksSeen" class="collection done-tasks">
            <li data-activates="slide-out"
                v-for="task in doneTasks" class="collection-item"
                v-on:dblclick="taskDoubleClicked"
                @click="setActiveTask(task)"
                :class="{active: activeTask === task }">
                {{task.text}}
                <a class="secondary-content">
                    <i class="material-icons">
                        check
                    </i>
                </a>
            </li>
        </ul>
        <ul id="slide-out" class="side-nav">
            <li>
                <div class="user-view">
                    <input type="text" :value="activeTask.text" @input="updateTaskText">
                </div>
            </li>
            <li>
                <a class="waves-effect" v-on:click="updateTask(activeTask)">
                    <i class="material-icons">save</i>
                    Save
                </a>
            </li>
            <li>
                <a class="waves-effect" v-on:click="deleteTask(activeTask)">
                    <i class="material-icons">delete</i>
                    Remove
                </a>
            </li>
        </ul>
        <a style="display: none" href="#" data-activates="slide-out" id="button-collapse"></a>
    </div>
</template>
<script>
    import store from '../store/index';
    import {mapGetters, mapState} from 'vuex';

    export default {
        data() {
            return {
                taskText: '',
                doneTasksSeen: false,
                tasksLoaded: false,
            }
        },
        created() {
            document.body.className = 'dashboard';
        },
        destroyed() {
            document.body.className = document.body.className.replace('dashboard', '');
        },
        beforeRouteEnter(to, from, next) {
            if (store.getters.isLoggedIn) {
                store.dispatch('getUser').catch(error => {
                    if (error.response) {
                        this.checkResponse(error.response.status);
                    }
                });
                next();
            } else {
                next('/login');
            }
        },
        mounted() {
            store.dispatch('getTasks').then(() => {
                this.tasksLoaded = true;
            }).catch(error => {
                if (error.response) {
                    this.checkResponse(error.response.status);
                }
            });

            $('#button-collapse').sideNav({
                edge: 'right'
            });
        },
        methods: {
            createTask() {
                store.dispatch('createTask', this.taskText)
                    .then(() => {
                        this.taskText = '';
                    }).catch(error => {
                    if (error.response) {
                        this.checkResponse(error.response.status);
                    }
                });
            },

            markTaskAsDone(task) {
                store.dispatch('markTaskAsDone', task)
                    .catch(error => {
                        if (error.response) {
                            this.checkResponse(error.response.status);
                        }
                        console.log('jsError', error);
                    });
                console.log(this.activeTask);
            },

            updateTask(task) {
                store.dispatch('updateTask', task)
                    .then(() => {
                        $('#button-collapse').sideNav('hide');
                    }).catch(error => {
                    if (error.response) {
                        this.checkResponse(error.response.status);
                    }
                    console.log(error);
                });
            },

            deleteTask(task) {
                store.dispatch('deleteTask', task)
                    .then(() => {
                        $('#button-collapse').sideNav('hide');
                    }).catch(error => {
                    if (error.response) {
                        this.checkResponse(error.response.status);
                    }
                    console.log(error);
                });
            },

            logout() {
                store.dispatch('logout').then(() => {
                    this.$router.push('/login');
                    Materialize.toast('Logged out', 5000);
                });
            },

            setActiveTask(task) {
                store.commit('setActiveTask', task);
            },

            updateTaskText(e) {
                store.commit('updateTaskText', e.target.value)
            },

            checkResponse(status) {
                if (status == 500) {
                    Materialize.toast('Server error!', 5000);
                }
                if (status == 403) {
                    store.dispatch('logout');
                    this.$router.push('/login');
                }
            },

            taskDoubleClicked() {
                $('#button-collapse').sideNav('show');
            }
        },
        computed: {
            ...mapGetters({
                tasks: 'undoneTasks',
                activeTask: 'activeTask',
                doneTasks: 'doneTasks',
                user: 'currentUser'
            }),
        },
    }
</script>