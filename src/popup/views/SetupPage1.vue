<template>
    <div class="flex flex-col justify-around items-center h-full px-8">
        <img :src="Shopping" class="w-48" alt="">
        <div>
            <h1 class="text-lg font-bold font-sans text-mineshaft text-center mb-4">
                Shopping made easier.
            </h1>
            <p class="text-sm font-sans text-center">
                It's never been easier to shop online. Create personalised wish lists and store thousands of items
                all in one place.
            </p>
        </div>
        <Pager :page-prefix="pagePrefix"/>
        <router-link :to="{ name: 'setup-page-2' }"
                     class="bg-mantis px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center">
            Continue
        </router-link>
    </div>
</template>

<script>
    import Full from "../layouts/Full";
    import Shopping from "../components/assets/images/Shopping.png"
    import Pager from "../components/Pager";

    export default {
        name: "SetupPage1",
        components: {Pager},
        data() {
            return {
                Shopping,
                pagePrefix: 'setup-page-'
            }
        },
        created() {
            this.$emit('update:layout', Full);
        }
    }
</script>

<style scoped>

</style>