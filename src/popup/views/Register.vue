<template>
    <div class="flex items-center h-full">
        <div class="w-full px-8 font-sans">
            <Header class="my-2"/>
            <h1 class="text-lg font-bold text-mineshaft">
                Create an account.
            </h1>
            <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed }">
                <form @submit.prevent="passes(register)" class="my-5">
                    <div class="mb-4 relative">
                        <ValidationProvider rules="required|alpha_spaces|min:3" v-slot="{ valid, errors }">
                            <input v-model="name"
                                   :class="[name !== '' ? filledClass : '', valid ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="name" type="text">
                            <label for="name"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Your
                                Name</label>
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
                    <div class="mb-4 relative">
                        <ValidationProvider rules="required|email" v-slot="{valid, errors}">
                            <input v-model="email" autocomplete="username"
                                   :class="[email !== '' ? filledClass : '', valid ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="email" type="text">
                            <label for="email"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Email
                                Address</label>
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
                    <div class="mb-4 relative">
                        <ValidationProvider rules="required|min:6" v-slot="{ valid, errors }">
                            <input v-model="password" v-on:keyup="" autocomplete="current-password"
                                   :class="[password !== '' ? filledClass : '', valid ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 pr-12 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="password" :type="[!passwordVisible ? 'password' : 'text']">
                            <label for="password"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Password</label>
                            <div class="absolute right-0 -mt-10 pb-1 mr-2 cursor-pointer"
                                 v-on:click="passwordVisible = !passwordVisible">
                                <Eye :class="[!passwordVisible ? 'text-silver' : 'text-dovegrey', 'fill-current w-6 h-6']"/>
                            </div>
                            <p v-show="errors[0]"
                               class="font-sans text-sm text-red-500 font-bold pt-1">{{ errors[0]
                                }}</p>
                        </ValidationProvider>
                        <div class="my-4">
                            <password v-model="password" :strength-meter-only="true"></password>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between">
                        <button class="bg-silver px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center mb-2"
                                :class="[!invalid && changed ? enabledClass : '']"
                                type="submit"
                                :disabled="invalid">
                            <TailSpin v-if="isRegistering" class="w-6 h-6 mx-auto"/>
                            <span v-else class="block w-full h-6">Register</span>
                        </button>
                        <p v-show="registerError"
                           class="font-sans text-sm text-red-500 font-bold">{{ registerError }}</p>
                        <router-link :to="{name: 'login'}" tag="button" v-on:click.native="resetRegisterForm"
                                     class="text-sm text-dovegrey py-3 w-full text-left focus:outline-none">
                            Already have an account? <span class="text-blue-500">Log in</span>
                        </router-link>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import Header from "../components/Header";
    import Eye from "../components/assets/svg/Eye";
    import Check from "../components/assets/svg/Check";
    import Cross from "../components/assets/svg/Cross";
    import TailSpin from "../components/assets/svg/TailSpin";
    import Password from "vue-password-strength-meter";
    import Full from "../layouts/Full";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Register",
        components: {
            ValidationObserver,
            ValidationProvider,
            Header,
            Eye,
            Check,
            Cross,
            TailSpin,
            Password
        },
        created() {
            this.$emit('update:layout', Full);
        },
        data() {
            return {
                filledClass: 'filled',
                enabledClass: 'enabled',
                errorClass: 'error',
                validClass: 'valid',
                passwordVisible: false
            }
        },
        computed: {
            name: {
                get() {
                    return this.$store.state.auth.name;
                },
                set(val) {
                    this.$store.commit('auth/SET_NAME', val);
                }
            },
            email: {
                get() {
                    return this.$store.state.auth.email;
                },
                set(val) {
                    this.$store.commit('auth/SET_EMAIL', val);
                }
            },
            password: {
                get() {
                    return this.$store.state.auth.password;
                },
                set(val) {
                    this.$store.commit('auth/SET_PASSWORD', val);
                }
            },
            ...mapGetters('auth', [
                'isRegistering',
                'registerError'
            ])
        },
        methods: {
            register() {
                this.$store.dispatch('auth/register')
                    .then(() => {
                        this.fetchUser();
                        this.fetchItems();
                        this.fetchLists();
                        this.fetchStores();
                        this.fetchCapturedItem();
                        this.$router.push('/lists');
                    }).catch(e => {
                });
            },
            ...mapActions('auth', [
                'fetchUser',
                'resetRegisterForm'
            ]),
            ...mapActions('items', [
                'fetchItems',
                'fetchCapturedItem'
            ]),
            ...mapActions('lists', ['fetchLists']),
            ...mapActions('stores', ['fetchStores']),
        }
    }
</script>

<style scoped>
    @import "../components/assets/css/forms.css";
</style>
