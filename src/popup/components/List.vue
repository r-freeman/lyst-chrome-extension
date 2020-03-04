<template>
    <li class="py-3 border-b-2 border-gray-100">
        <div class="flex justify-between items-center">
            <router-link :to="{name: 'list', params: {id: list.id}}">
                <p class="bg-blue-100 rounded-full px-2 relative text-sm font-sans no-underline">
                    <span class="text-sm font-semibold text-blue-500">{{ list.name }}</span>
                </p>
            </router-link>
            <div class="inline-flex items-center">
                <p class="bg-teal-100 rounded-full px-2">
                    <span class="text-sm font-semibold text-teal-500">{{ itemCount }} items</span>
                </p>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "List",
        props: ['list'],
        computed: {
            itemCount() {
                return this.$props.list.items.length
            }
        }
    }
</script>

<style scoped>

</style>