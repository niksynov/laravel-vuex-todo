<template>
    <div class="alert-component">
        <div v-for="alert in alerts">
            <div v-bind:class="[alert.alertType == successType ? 'alert-component-success  ' : 'alert-component-error']">
                <i v-on:click="closeAlert(alert)" class="fa fa-times" aria-hidden="true"></i>
                {{ alert.alertInfo }}
            </div>
        </div>

    </div>
</template>
<script>
    import {ERROR_TYPE, SUCCESS_TYPE} from '../../constants.js';
    export default {
        data() {
            return {
                errorType: ERROR_TYPE,
                successType: SUCCESS_TYPE,
                alerts: [],
                test: "test"
            }
        },
        mounted() {
            Event.$on('displayError', (alertInfo) => {
                this.alerts.push({
                    alertType: ERROR_TYPE,
                    alertInfo: alertInfo
                });
            });
            Event.$on('displaySuccess', (alertInfo) => {
                this.alerts.push({
                    alertType: SUCCESS_TYPE,
                    alertInfo: alertInfo
                });
            });
        },
        methods: {
            closeAlert(alert) {
                let index = this.alerts.indexOf(alert);
                if (index > -1) {
                    this.alerts.splice(index, 1);
                }
            }
        }
    }
</script>
