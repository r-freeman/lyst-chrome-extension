<template>
    <div id="app">
        <component :is="layout">
            <router-view :layout.sync="layout"/>
        </component>
    </div>
</template>

<script>
    import authService from "./services/auth";
    import {mapActions} from "vuex";

    export default {
        data() {
            return {
                layout: 'div'
            }
        },
        created() {
            authService.isLoggedIn()
                .then(() => {
                    this.fetchUser();
                    this.fetchLists();
                    this.fetchItems();
                    this.fetchStores();
                    this.fetchCapturedItem();
                    this.$router.push('lists');
                }).catch(e => this.$router.push('/login'));

            // this.$router.push('/setup-page-1');
        },
        methods: {
            ...mapActions('auth', ['fetchUser']),
            ...mapActions('lists', ['fetchLists']),
            ...mapActions('items', [
                'fetchItems',
                'fetchCapturedItem'
            ]),
            ...mapActions('stores', ['fetchStores'])
        }
    };
</script>

<style scoped>
    #app {
        background: #ffffff;
        height: 100%
    }
</style>
