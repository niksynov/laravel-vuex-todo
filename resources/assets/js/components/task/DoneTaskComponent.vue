<template id="done-task-component">
    <div class="done-task-component">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Done tasks</h4></li>
            <li v-for="task in doneTasks" class="collection-item">
                <div>
                    {{ task.text }}
                    <a class="secondary-content">
                        <i v-on:click="markTaskAsDone(task.id)" class="material-icons">
                            done
                        </i>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import User from '../../services/UserService';
    export default {
        data() {
            return {
                doneTasks: []
            }
        },
        methods: {
        },
        mounted() {
            const toast = Materialize.toast('Loading...');
            User.getUserDoneTasks().then((response) => {
                if (response) {
                    this.doneTasks = response;
                    toast.remove();
                }
            });
        }
    }
</script>