<template>
    <div class="absolute top-0 flex flex-col justify-center items-center w-full h-full px-8 bg-white z-20">
        <div class="p-6">
            <Avatar class="w-16 h-16 mx-auto text-gray-300 fill-current mb-4"/>
            <div class="text-center">
                <h2 class="text-lg font-bold font-sans text-mineshaft text-center mb-1">{{ user.name }}</h2>
                <p class="text-sm font-sans font-semibold text-dovegrey">{{ user.email }}</p>
            </div>
        </div>
        <div class="w-full">
            <button class="bg-mantis px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center"
                    @click="logout">
                <TailSpin v-if="isLoggingOut" class="w-6 h-6 mx-auto"/>
                <span v-else class="block w-full h-6">Log Out</span>
            </button>
            <button class="text-sm text-silver py-3 w-full focus:outline-none"
                    @click="toggleViewUser">
                Back
            </button>
        </div>
    </div>
</template>

<script>
    import Avatar from "../components/assets/svg/Avatar";
    import TailSpin from "../components/assets/svg/TailSpin";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "User",
        components: {
            Avatar,
            TailSpin
        },
        computed: {
            ...mapGetters('auth', [
                'user',
                'isLoggingOut'
            ])
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout')
                    .then(() => {
                        this.$router.push('/login');
                        this.toggleViewUser();
                    })
            },
            ...mapActions('auth', [
                'toggleViewUser'
            ])
        }
    }
</script>

<style scoped>

</style>
