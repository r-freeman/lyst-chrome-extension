<template>
    <div class="flex flex-col justify-around items-center h-full px-8">
        <div class="absolute top-0 left-0 p-8 cursor-pointer" @click="goBack">
            <Back class="w-6 h-6 fill-current text-dovegrey"/>
        </div>
        <img :src="Heart" class="w-48" alt="">
        <div>
            <h1 class="text-lg font-bold font-sans text-mineshaft text-center mb-4">
                Save items with a click.
            </h1>
            <p class="text-sm font-sans text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolorum earum, fuga necessitatibus
                omnis ut.
            </p>
        </div>
        <Pager :page-prefix="pagePrefix"/>
        <router-link :to="{ name: 'setup-page-3' }"
                     class="bg-mantis px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center">
            Continue
        </router-link>
    </div>
</template>

<script>
    import Heart from "../components/assets/images/Heart.png"
    import Back from "../components/assets/svg/Back";
    import Pager from "../components/Pager";

    export default {
        name: "SetupPage2",
        components: {Back, Pager},
        data() {
            return {
                Heart,
                pagePrefix: 'setup-page-'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>