<template>
    <header class="w-full py-5 bg-white">
        <Logo class="logo-header"></Logo>
    </header>
</template>

<script>
    import Logo from "./assets/svg/Logo";

    export default {
        components: {Logo},
        name: "Header"
    }
</script>

<style scoped>
    .logo-header {
        @apply w-16 mx-auto fill-current text-safetyorange
    }
</style>
