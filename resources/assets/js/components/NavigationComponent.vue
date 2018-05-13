<template>
    <div class="navigation-component">
        <nav>
            <div class="nav-wrapper">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png">
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><router-link to="/login">Log in</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
    <!--</nav>-->
</template>
<script>
    import auth from '../api/auth';

    export default {
        data() {
           return {
               loggedIn:auth.loggedIn()
           }
        }
    }
</script>