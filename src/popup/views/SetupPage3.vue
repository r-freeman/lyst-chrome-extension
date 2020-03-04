<template>
    <div class="flex flex-col justify-around items-center h-full px-8">
        <div class="absolute top-0 left-0 p-8 cursor-pointer" @click="goBack">
            <Back class="w-6 h-6 fill-current text-dovegrey"/>
        </div>
        <img :src="Delivery" class="w-48" alt="">
        <div>
            <h1 class="text-lg font-bold font-sans text-mineshaft text-center mb-4">
                Happy shopping.
            </h1>
            <p class="text-sm font-sans text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae ipsum officia provident quo
                reprehenderit.
            </p>
        </div>
        <Pager :page-prefix="pagePrefix"/>
        <button class="bg-mantis px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center"
                @click.prevent="setupComplete">
            Get Started
        </button>
    </div>
</template>

<script>
    import Delivery from "../components/assets/images/Delivery.png"
    import Back from "../components/assets/svg/Back";
    import Pager from "../components/Pager";

    export default {
        name: "Page3",
        components: {Back, Pager},
        data() {
            return {
                Delivery,
                pagePrefix: 'setup-page-'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            setupComplete() {
                this.$emit('setup-complete');
            }
        }
    }
</script>

<style scoped>

</style>