<template>
    <div class="flex items-center h-full">
        <div class="w-full px-8 font-sans">
            <Header class="my-2"/>
            <h1 class="text-lg font-bold text-mineshaft">
                Log in to your account.
            </h1>
            <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed }">
                <form @submit.prevent="passes(login)" class="my-5">
                    <div class="mb-4 relative">
                        <ValidationProvider rules="required|email" v-slot="{ valid, errors }">
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
                        <ValidationProvider rules="required" v-slot="{ valid, errors }">
                            <input v-model="password" autocomplete="current-password"
                                   :class="[password !== '' ? filledClass : '', valid ? validClass : errors[0] ? errorClass : '']"
                                   class="input border border-silver text-base text-dovegrey appearance-none rounded w-full px-3 pr-12 py-3 pt-5 pb-2 focus focus:border-dovegrey focus:outline-none active:outline-none active:border-dovegrey"
                                   id="password" type="password">
                            <label for="password"
                                   class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Password</label>
                            <div v-if="valid" class="absolute right-0 -mt-10 mr-2">
                                <Check class="w-6 h-6 fill-current text-mantis"/>
                            </div>
                            <div v-else-if="errors[0]" class="absolute right-0 -mt-10 mr-2">
                                <Cross class="w-6 h-6 fill-current text-red-500"/>
                            </div>
                            <p v-show="errors[0]"
                               class="font-sans text-sm text-red-500 font-bold pt-1">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </div>
                    <div class="flex flex-col justify-between">
                        <button class="bg-silver px-4 py-3 w-full rounded text-sm font-semibold text-white focus:outline-none text-center mb-2"
                                :class="[!invalid && changed ? enabledClass : '']"
                                type="submit"
                                :disabled="invalid">
                            <TailSpin v-if="isLoggingIn" class="w-6 h-6 mx-auto"/>
                            <span v-else class="block w-full h-6">Log In</span>
                        </button>
                        <p v-show="loginError"
                           class="font-sans text-sm text-red-500 font-bold">{{ loginError }}</p>
                        <a v-show="loginAttempts > 2" href="" class="my-2 text-sm font-semibold text-silver underline">Forgotten
                            Password?</a>
                        <router-link :to="{name: 'register'}" tag="button" v-on:click.native="resetLoginForm"
                                     class="text-sm text-dovegrey py-3 w-full text-left focus:outline-none">
                            Don't have an account? <span class="text-blue-500">Register</span>
                        </router-link>
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
    import Header from "../components/Header";
    import Full from "../layouts/Full";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Login",
        components: {
            ValidationObserver,
            ValidationProvider,
            Check,
            Cross,
            TailSpin,
            Header
        },
        created() {
            this.$emit('update:layout', Full);
        },
        data() {
            return {
                filledClass: 'filled',
                enabledClass: 'enabled',
                errorClass: 'error',
                validClass: 'valid'
            }
        },
        computed: {
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
                'isLoggingIn',
                'loginAttempts',
                'loginError'
            ])
        },
        methods: {
            login() {
                this.$store.dispatch('auth/login')
                    .then(() => {
                        this.fetchUser();
                        this.fetchLists();
                        this.fetchItems();
                        this.fetchStores();
                        this.fetchCapturedItem();
                        this.$router.push('/lists');
                    }).catch(e => {
                })
            },
            ...mapActions('auth', [
                'fetchUser',
                'resetLoginForm'
            ]),
            ...mapActions('items', [
                'fetchItems',
                'fetchCapturedItem'
            ]),
            ...mapActions('lists', ['fetchLists']),
            ...mapActions('stores', ['fetchStores'])
        }
    }
</script>

<style scoped>
    @import "../components/assets/css/forms.css";
</style>
