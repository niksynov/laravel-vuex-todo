<template>
    <div>
        <navigationComponent v-if="['/login', '/register'].indexOf(this.$route.path) > -1"></navigationComponent>
        <div class="app__content">
            <router-view :key="$router.fullPath"></router-view>
        </div>
        <footerComponent v-if="['/login', '/register'].indexOf(this.$route.path) > -1"></footerComponent>
    </div>
</template>
<script>
    import NavigationComponent from './NavigationComponent.vue';
    import FooterComponent from './FooterComponent.vue';

    export default {
        components: {
            navigationComponent: NavigationComponent,
            footerComponent: FooterComponent
        }
    }
</script>