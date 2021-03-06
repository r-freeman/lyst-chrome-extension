<template>
    <div>
        <SaveItem v-if="saveItem"/>
        <EditItem v-if="editItem"/>
        <User v-if="viewUser"/>

        <section class="flex bg-white shadow-b items-center">
            <div class="w-1/3 py-3 text-center">
            </div>
            <button class="w-1/3 h-16 text-center active font-sans text-sm font-semibold focus:outline-none cursor-default">
                Your Items
            </button>
            <div class="w-1/3 py-3 text-center">
                <button v-if="Object.keys(item).length > 0"
                        class="bg-mantis px-4 py-2 rounded-full font-sans text-sm font-semibold text-white focus:outline-none"
                        @click="toggleSaveItem">
                    Save Item
                </button>
            </div>
        </section>
        <div class="flex-1 min-h-0">
            <div class="flex-1 overflow-y-auto">
                <div class="overflow-content py-5">
                    <Loading v-if="isLoading" class="fill-current text-silver w-10 mx-auto"/>
                    <div v-else-if="itemCount > 0">
                        <div class="flex justify-between mb-2">
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased"
                                    @click="sortItems">
                                Sort {{ sort === 'desc' ? '(Newest)' : '(Oldest)' }}
                            </button>
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased">
                                Filter
                            </button>
                        </div>
                        <section class="bg-white border-b-2 border-t-2 border-gray-100 px-5">
                            <ul>
                                <Item v-for="item in sortedItems"
                                      :item="item"
                                      :key="item.id"
                                      v-on:edit-item="toggleEditItem(item)"/>
                            </ul>
                        </section>
                    </div>
                    <div v-else>
                        <div class="w-full text-center">
                            <p class="text-sm font-bold font-sans antialiased text-silver">
                                No items here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Base from "../layouts/Base";
    import Item from "../components/Item";
    import Loading from "../components/assets/svg/Loading";
    import SaveItem from "./SaveItem";
    import EditItem from "./EditItem";
    import User from "./User";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Items",
        components: {
            Item,
            Loading,
            SaveItem,
            EditItem,
            User
        },
        created() {
            this.$emit('update:layout', Base);
        },
        methods: {
            ...mapActions('items', [
                'fetchItems',
                'toggleSaveItem',
                'toggleEditItem',
                'sortItems'
            ])
        },
        computed: {
            ...mapGetters('items', [
                'sortedItems',
                'isLoading',
                'itemCount',
                'item',
                'saveItem',
                'editItem',
                'sort'
            ]),
            ...mapGetters('auth', [
                'viewUser'
            ])
        }
    }
</script>

<style scoped>
    .active {
        @apply border-b-4 border-safetyorange
    }
</style>
