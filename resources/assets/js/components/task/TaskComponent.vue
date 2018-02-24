<template id="task-component">
    <div class="task-component">
        <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <input v-model="taskText" v-on:keyup.enter="createNewTask" id="task-text" type="text" class="validate">
            <label for="task-text">Task text</label>
        </div>
        <div class="collection">
            <a href="#" data-activates="slide-out" v-for="task in tasks" class="collection-item"
               v-on:click="selectTask(task)">
                {{task.text}}
                <a class="secondary-content">
                    <i v-on:click="markTaskAsDone(task.id)" class="material-icons">
                        check_box_outline_blank
                    </i>
                </a>
            </a>
        </div>
        <ul id="slide-out" class="side-nav">
            <li>
                <div class="user-view">
                    <input type="text" v-model="currentTask.text">
                </div>
                <a class="waves-effect waves-light btn" v-on:click="editTask(currentTask.id, currentTask.text)">Save</a>
                <a class="waves-effect waves-light btn red" v-on:click="removeTask(currentTask.id)">Remove</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import User from '../../services/UserService';

    export default {
        data() {
            return {
                taskText: '',
                tasks: [],
                currentTask: {
                    id: null,
                    text: ''
                }
            }
        },
        methods: {
            createNewTask() {
                User.createUserTask(this.taskText).then(response => {
                    if (response) {
                        this.tasks.push(response);
                        this.taskText = '';
                        Materialize.toast('Task was added', 4000);
                    }
                }).then(() => {
                    $(".collection-item").sideNav();
                });
            },
            markTaskAsDone(taskId) {
                $(".collection-item").sideNav('destroy');
                User.markTaskAsDone(taskId).then(response => {
                    if (response) {
                        this.tasks = this.tasks.filter(task => task.id !== taskId);
                        Materialize.toast('Task was completed', 4000);
                    }
                });
            },
            selectTask(task) {
                this.currentTask = task;
            },
            editTask(currentTaskId, text) {
                console.log();
                User.editTask(currentTaskId, text).then(response => {
                    if (response) {
                        $(".collection-item").sideNav('hide');
                        Materialize.toast('Task was updated', 4000);
                    }
                });
            },
            removeTask(currentTaskId) {
                User.removeTask(currentTaskId).then(response => {
                    if (response) {
                        this.tasks = this.tasks.filter(task => task.id !== currentTaskId);
                        $(".collection-item").sideNav('hide');
                        Materialize.toast('Task was deleted', 4000);
                    }
                });
            }
        },
        mounted() {
            const toast = Materialize.toast('Loading...');
            User.getUserTasks().then(response => {
                if (response) {
                    this.tasks = response;
                    toast.remove();
                }
            }).then(() => {
                $(".collection-item").sideNav();
            });
        }
    }
</script>