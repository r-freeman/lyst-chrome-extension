<template>
    <li class="py-5 border-b-2 border-gray-100">
        <div class="flex">
            <div @click="editItem" :class="[this.$route.path.includes('items') ? 'cursor-pointer' : '']">
                <div class="bg-contain bg-center bg-no-repeat w-16 h-16 rounded-lg mr-4"
                     v-bind:style="{'background-image': 'url(' + item.image +')' }">
                </div>
            </div>
            <div @click="editItem" :class="[this.$route.path.includes('items') ? 'cursor-pointer' : '', 'flex-1 px-2']">
                <p class="font-sans text-xs font-black uppercase tracking-wide mb-2">
                    {{ itemStore }}
                </p>
                <p class="font-sans text-sm font-semibold mb-2">{{ item.title | truncate(60, ' ') }}</p>
                <div class="flex items-center">
                    <p v-if="item.price !== null" class="inline bg-green-100 rounded-full px-2 mr-2">
                        <span class="text-sm font-semibold text-mantis">{{ item.price }}</span>
                    </p>
                    <p v-if="listName !== 'unlisted'"
                       class="bg-blue-100 rounded-full px-2 relative text-sm font-sans no-underline">
                        <span class="text-sm font-semibold text-blue-500">{{ listName }}</span>
                    </p>
                </div>
            </div>
            <div>
                <a :href="item.url" target="_blank" class="mr-2">
                    <Link class="w-4 h-4 fill-current text-dovegrey"/>
                </a>
            </div>
        </div>
    </li>
</template>

<script>
    import Link from "./assets/svg/Link";

    export default {
        name: "Item",
        props: ['item'],
        components: {
            Link
        },
        methods: {
            editItem() {
                this.$emit('edit-item');
            }
        },
        computed: {
            itemStore() {
                return this.$props.item.store.name + ' ' + this.$props.item.store.region
            },
            listName() {
                if ('lists' in this.$props.item) {
                    return this.$props.item.lists[0].name;
                } else {
                    return null
                }
            }
        }
    }
</script>

<style scoped>

</style>