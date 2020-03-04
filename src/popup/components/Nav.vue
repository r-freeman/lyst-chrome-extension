<template>
    <nav class="flex bg-white">
        <router-link :to="{ name: 'items' }" tag="button"
                     class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100">
            <Item :class="[currentPage.includes('item') ? activeClass : 'text-gray-300', 'w-8 h-8 mx-auto fill-current']"/>
        </router-link>
        <router-link :to="{ name : 'lists' }" tag="button"
                     class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100">
            <Lists :class="[currentPage.includes('list') ? activeClass : 'text-gray-300', 'w-8 h-8 mx-auto fill-current']"/>
        </router-link>
        <button class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100"
                @click="toggleViewUser">
            <Avatar class="text-gray-300 w-8 h-8 mx-auto fill-current"/>
        </button>
    </nav>
</template>

<script>
    import Item from "./assets/svg/Item";
    import Lists from "./assets/svg/Lists";
    import Avatar from "./assets/svg/Avatar";
    import {mapActions} from "vuex";

    export default {
        name: "Nav",
        components: {
            Item,
            Lists,
            Avatar
        },
        data() {
            return {
                activeClass: 'active'
            };
        },
        computed: {
            currentPage() {
                return this.$route.name;
            }
        },
        methods: {
            ...mapActions('auth', [
                'toggleViewUser'
            ])
        }
    }
</script>

<style scoped>
    .active {
        @apply text-dovegrey
    }
</style>
