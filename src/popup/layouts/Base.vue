<template>
    <div id="base" class="relative flex flex-col bg-alabaster h-full select-none text-dovegrey font-sans">
        <Header/>
        <main id="base__main">
            <slot/>
        </main>
        <Footer/>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";

    export default {
        name: "Base",
        components: {Header, Footer}
    }
</script>

<style scoped>

</style>