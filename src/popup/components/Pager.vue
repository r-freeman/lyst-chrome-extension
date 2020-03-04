<template>
    <nav class="flex justify-center">
        <a v-for="page in pages" :page="page" :key="page.num"
           :class="[currentPage.includes(page.name) ? activeClass : 'bg-silver', 'd-block w-2 h-2 mx-1 rounded-full']"></a>
    </nav>
</template>

<script>
    export default {
        name: "Pager",
        data() {
            return {
                activeClass: 'active',
                pages: []
            }
        },
        props: {
            pagePrefix: {
                type: String,
                required: true
            }
        },
        created() {
            this.$router.options.routes.forEach((route, i) => {
                if (route.path.includes(this.pagePrefix)) {
                    this.pages.push({
                        num: i,
                        name: route.name
                    })
                }
            });
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
