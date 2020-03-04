<template>
    <div>
        <EditList v-if="editList"/>
        <User v-if="viewUser"/>

        <section class="flex bg-white shadow-b items-center">
            <div class="w-1/3 py-3 text-center">
                <div class="w-full h-full cursor-pointer items-center" @click="goBack">
                    <Back class="w-6 h-6 mx-auto text-dovegrey fill-current"/>
                </div>
            </div>
            <button class="w-1/3 h-16 text-center active font-sans text-sm font-semibold focus:outline-none cursor-default">
                {{ list.name }}
            </button>
            <div class="w-1/3 py-3 text-center">
                <button class="bg-mantis px-4 py-2 rounded-full font-sans text-sm font-semibold text-white focus:outline-none"
                        @click="toggleEditList">
                    Edit List
                </button>
            </div>
        </section>
        <div class="flex-1 min-h-0">
            <div class="flex-1 overflow-y-auto">
                <div class="overflow-content py-5">
                    <div v-if="listItemCount > 0">
                        <div class="flex justify-between mb-2">
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased"
                                    @click="toggleSortListItems">
                                Sort {{ sortListItems === 'desc' ? '(Newest)' : '(Oldest)' }}
                            </button>
                            <button class="text-sm font-sans font-bold text-silver px-5 focus:outline-none antialiased">
                                Filter
                            </button>
                        </div>
                        <section class="bg-white border-b-2 border-t-2 border-gray-100 px-5">
                            <ul>
                                <Item v-for="item in sortedListItems"
                                      :item="item"
                                      :key="item.id"/>
                            </ul>
                        </section>
                    </div>
                    <div v-else>
                        <div class=" w-full text-center
                                ">
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
    import EditList from "./EditList";
    import Back from "../components/assets/svg/Back";
    import Item from "../components/Item";
    import User from "./User";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "List",
        created() {
            this.$store.dispatch('lists/fetchList', this.$route.params.id);
        },
        components: {
            Back,
            EditList,
            Item,
            User
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            ...mapActions('lists', [
                'toggleEditList',
                'toggleSortListItems'
            ])
        },
        computed: {
            ...mapGetters('lists', [
                'list',
                'listItemCount',
                'editList',
                'sortListItems',
                'sortedListItems'
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