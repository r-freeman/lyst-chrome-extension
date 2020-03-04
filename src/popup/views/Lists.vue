<template>
    <div>
        <CreateList v-if="createList"/>
        <User v-if="viewUser"/>

        <section class="flex bg-white shadow-b items-center">
            <div class="w-1/3 py-3 text-center">
            </div>
            <button class="w-1/3 h-16 text-center active font-sans text-sm font-semibold focus:outline-none cursor-default">
                Your Lists
            </button>
            <div class="w-1/3 py-3 text-center">
                <button class="bg-mantis px-4 py-2 rounded-full font-sans text-sm font-semibold text-white focus:outline-none"
                        @click="toggleCreateList">
                    Create List
                </button>
            </div>
        </section>
        <div class="flex-1 min-h-0">
            <div class="flex-1 overflow-y-auto">
                <div class="overflow-content py-5">
                    <Loading v-if="isLoading" class="fill-current text-silver w-10 mx-auto"/>

                    <div v-else-if="listCount > 0">
                        <div class="flex justify-between mb-2">
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased"
                                    @click="toggleSortLists">
                                Sort {{ sortLists === 'asc' ? '(A-Z)' : '(Z-A)' }}
                            </button>
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased">
                                Filter
                            </button>
                        </div>
                        <section class="bg-white border-b-2 border-t-2 border-gray-100 px-5">
                            <ul>
                                <List v-if="list.name !== 'unlisted'"
                                      v-for="list in sortedLists"
                                      :list="list"
                                      :key="list.id"/>
                            </ul>
                        </section>
                    </div>
                    <div v-else>
                        <div class="w-full text-center">
                            <p class="text-sm font-bold font-sans antialiased text-silver">
                                No lists here.
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
    import List from "../components/List";
    import Loading from "../components/assets/svg/Loading";
    import CreateList from "./CreateList";
    import User from "./User";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Lists",
        components: {
            List,
            Loading,
            CreateList,
            User
        },
        created() {
            this.$emit('update:layout', Base);
        },
        methods: {
            ...mapActions('lists', [
                'fetchLists',
                'toggleCreateList',
                'toggleSortLists',
                'viewList'
            ])
        },
        computed: {
            ...mapGetters('lists', [
                'sortedLists',
                'isLoading',
                'listCount',
                'createList',
                'sortLists'
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
