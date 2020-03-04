<template>
    <div class="absolute top-0 flex flex-col justify-around items-center w-full h-full px-8 bg-white z-10">
        <div class="w-full">
            <h1 class="text-lg font-bold font-sans text-mineshaft text-center mb-8">
                Edit List
            </h1>
            <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
                <form @submit.prevent="passes(editList)" class="my-5">
                    <div class="mb-4 relative">
                        <ValidationProvider rules="required|alpha_spaces|min:3" v-slot="{ valid, errors }">
                            <input v-model="listName"
                                   :class="[listName !== '' ? filledClass : '', valid ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="name"
                                   type="text">
                            <label for="name"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Name</label>
                            <div v-if="valid" class="absolute right-0 -mt-10 mr-2">
                                <Check class="w-6 h-6 fill-current text-mantis"/>
                            </div>
                            <div v-else-if="errors[0]" class="absolute right-0 -mt-10 mr-2">
                                <Cross class="w-6 h-6 fill-current text-red-500"/>
                            </div>
                            <p v-show="errors[0]" class="font-sans text-sm text-red-500 font-bold pt-1">{{ errors[0]
                                }}</p>
                        </ValidationProvider>
                    </div>
                    <div class="w-full">
                        <button type="submit"
                                class="bg-silver px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center"
                                :class="[!invalid ? enabledClass : '']"
                                :disabled="invalid">
                            <TailSpin v-if="isEditingList" class="w-6 h-6 mx-auto"/>
                            <span v-else class="block w-full h-6">Update</span>
                        </button>
                        <button type="button" class="text-sm text-silver py-3 w-full focus:outline-none"
                                @click="toggleEditList">
                            Cancel
                        </button>
                    </div>
                    <div class="absolute left-0 bottom-0 w-full px-8 mb-4">
                        <button type="button"
                                class="text-sm bg-white text-red-500 font-bold py-3 w-full mx-auto focus:outline-none rounded"
                                @click="deleteList">
                            Delete
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import Check from "../components/assets/svg/Check";
    import Cross from "../components/assets/svg/Cross";
    import TailSpin from "../components/assets/svg/TailSpin";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "EditList",
        components: {
            ValidationObserver,
            ValidationProvider,
            Check,
            Cross,
            TailSpin
        },
        data() {
            return {
                filledClass: 'filled',
                errorClass: 'error',
                enabledClass: 'enabled',
                validClass: 'valid'
            }
        },
        computed: {
            listName: {
                get() {
                    return this.$store.state.lists.listName;
                },
                set(val) {
                    this.$store.commit('lists/SET_LIST_NAME', val);
                }
            },
            ...mapGetters('lists', [
                'isEditingList',
                'list'
            ])
        },
        methods: {
            deleteList() {
                this.$store.dispatch('lists/deleteList')
                    .then(() => {
                        this.$router.push('/lists');
                    })
            },
            ...mapActions('lists', [
                'toggleEditList',
                'editList'
            ])
        }
    }
</script>

<style scoped>
    @import "../components/assets/css/forms.css";
</style>
