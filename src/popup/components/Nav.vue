<template>
    <nav class="flex bg-white">
        <router-link :to="{ name: 'items' }" tag="button"
                     class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100">
            <svg :class="[currentPage.includes('items') ? activeClass : 'text-gray-300', 'w-8 h-8 mx-auto fill-current']"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20">
                <path d="M14.83 4H20v6h-1v10H1V10H0V4h5.17A3 3 0 0 1 10 .76 3 3 0 0 1 14.83 4zM8 10H3v8h5v-8zm4 0v8h5v-8h-5zM8 6H2v2h6V6zm4 0v2h6V6h-6zM8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
        </router-link>
        <router-link :to="{ name : 'lists' }" tag="button"
                     class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100">
            <svg :class="[currentPage.includes('list') ? activeClass : 'text-gray-300', 'w-8 h-8 mx-auto fill-current']"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20">
                <path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"/>
            </svg>
        </router-link>
        <router-link :to="{ name : 'account' }" tag="button"
                     class="block w-1/3 h-20 focus:outline-none hover:bg-gray-100">
            <svg :class="[currentPage.includes('account') ? activeClass : 'text-gray-300', 'w-8 h-8 mx-auto fill-current']"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"/>
            </svg>
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                activeClass: 'active'
            };
        },
        computed: {
            currentPage() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
    .active {
        @apply bg-safetyorange
    }
</style>
