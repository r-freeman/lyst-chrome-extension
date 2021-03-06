<template>
    <div class="absolute top-0 flex flex-col justify-center w-full h-full bg-white z-10 px-8">
        <div>
            <h1 class="text-lg font-bold font-sans text-mineshaft text-center mb-8">
                Edit Item
            </h1>
            <ValidationObserver ref="observer" v-slot="{ passes }" class="mx-auto">
                <div class="text-center mb-8">
                    <div class="bg-contain bg-center bg-no-repeat w-full h-24 mb-4"
                         v-bind:style="{'background-image': 'url(' + _item.image +') ' }">
                    </div>
                    <p class="font-sans text-sm font-black uppercase tracking-wide mb-2">
                        {{ _itemStore }}
                    </p>
                    <h3 class="text-base font-bold font-sans text-mineshaft mb-2">
                        {{ _item.title | truncate(60, ' ') }}
                    </h3>
                    <p v-if="_item.price" class="inline bg-green-100 rounded-full px-2">
                        <span class="text-base font-bold text-mantis">{{ _item.price }}</span>
                    </p>
                </div>
                <form @submit.prevent="passes(editItem)">
                    <div class="mb-4 relative">
                        <ValidationProvider rules="alpha_spaces|min:3" v-slot="{ valid, errors, changed }">
                            <input v-model="itemListName"
                                   :class="[itemListName !== '' ? filledClass : '', valid && changed ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="name"
                                   type="text">
                            <label for="name"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">List
                                Name</label>
                            <div v-if="valid && changed" class="absolute right-0 -mt-10 mr-2">
                                <Check class="w-6 h-6 fill-current text-mantis"/>
                            </div>
                            <div v-else-if="errors[0]" class="absolute right-0 -mt-10 mr-2">
                                <Cross class="w-6 h-6 fill-current text-red-500"/>
                            </div>
                            <p v-show="errors[0]" class="font-sans text-sm text-red-500 font-bold pt-1">{{ errors[0]
                                }}</p>
                        </ValidationProvider>
                    </div>
                    <div class="w-full mb-16">
                        <button type="submit"
                                class="bg-mantis px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center">
                            <TailSpin v-if="isEditingItem" class="w-6 h-6 mx-auto"/>
                            <span v-else class="block w-full h-6">Update</span>
                        </button>
                        <button type="button" class="text-sm text-silver py-3 w-full focus:outline-none"
                                @click="toggleEditItem">
                            Cancel
                        </button>
                    </div>
                    <div class="absolute left-0 bottom-0 w-full px-8 mb-4">
                        <button type="button"
                                class="text-sm bg-white text-red-500 font-bold py-3 w-full mx-auto focus:outline-none rounded"
                                @click="deleteItem">
                            Delete
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import Check from "../components/assets/svg/Check";
    import Cross from "../components/assets/svg/Cross";
    import TailSpin from "../components/assets/svg/TailSpin";
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "EditItem",
        data() {
            return {
                filledClass: 'filled',
                errorClass: 'error',
                validClass: 'valid'
            }
        },
        created() {
            if (this._item.lists[0].name !== 'unlisted') {
                this.$store.commit('items/SET_ITEM_LIST_NAME', this._item.lists[0].name);
            }
        },
        components: {
            Check,
            Cross,
            TailSpin,
            ValidationObserver,
            ValidationProvider
        },
        computed: {
            itemListName: {
                get() {
                    return this.$store.state.items.itemListName;
                },
                set(val) {
                    this.$store.commit('items/SET_ITEM_LIST_NAME', val);
                }
            },
            ...mapGetters('items', [
                '_item',
                '_itemStore',
                'isEditingItem'
            ])
        },
        methods: {
            ...mapActions('items', [
                'toggleEditItem',
                'editItem',
                'deleteItem'
            ])
        }
    }
</script>

<style scoped>

</style>