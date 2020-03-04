import * as types from "../mutation-types";
import authService from "../../services/auth";

export default {
    namespaced: true,
    state: {
        name: "",
        email: "",
        password: "",
        user: {},
        token: "",
        isLoggingIn: false,
        isLoggingOut: false,
        isRegistering: false,
        loginAttempts: 0,
        loginError: "",
        registerError: "",
        viewUser: false
    },
    getters: {
        isLoggingIn: state => {
            return state.isLoggingIn;
        },
        isLoggingOut: state => {
            return state.isLoggingOut;
        },
        isRegistering: state => {
            return state.isRegistering;
        },
        loginAttempts: state => {
            return state.loginAttempts;
        },
        loginError: state => {
            return state.loginError;
        },
        registerError: state => {
            return state.registerError;
        },
        isLoggedIn: state => {
            return !!state.token;
        },
        user: state => {
            return state.user;
        },
        viewUser: state => {
            return state.viewUser;
        }
    },
    mutations: {
        [types.SET_NAME](state, payload) {
            state.name = payload;
        },
        [types.SET_EMAIL](state, payload) {
            state.email = payload;
        },
        [types.SET_PASSWORD](state, payload) {
            state.loginError = "";
            state.password = payload;
        },
        [types.ATTEMPT_LOGIN](state) {
            state.loginAttempts++;
            state.isLoggingIn = true;
        },
        [types.LOGIN_SUCCESS](state, payload) {
            state.loginAttempts = 0;
            state.user = payload;
            state.loginError = "";
            state.isLoggingIn = false;
        },
        [types.SET_TOKEN](state, payload) {
            state.token = payload;
        },
        [types.LOGIN_FAILURE](state, payload) {
            state.user = {};
            state.token = "";
            state.loginError = payload;
            state.isLoggingIn = false;
        },
        [types.FETCH_USER_SUCCESS](state, payload) {
            state.user = payload;
        },
        [types.FETCH_USER_FAILURE](state) {
            state.user = {};
        },
        [types.ATTEMPT_LOGOUT](state) {
            state.isLoggingOut = true;
        },
        [types.LOGOUT_SUCCESS](state) {
            state.email = "";
            state.password = "";
            state.token = "";
            state.isLoggingOut = false;
        },
        [types.LOGOUT_FAILURE](state) {
            state.isLoggingOut = false;
        },
        [types.ATTEMPT_REGISTER](state) {
            state.isRegistering = true;
        },
        [types.REGISTER_SUCCESS](state, payload) {
            state.user = payload;
            state.registerError = "";
            state.isRegistering = false;
        },
        [types.REGISTER_FAILURE](state, payload) {
            state.user = {};
            state.token = "";
            state.registerError = payload;
            state.isRegistering = false;
        },
        [types.RESET_LOGIN_FORM](state) {
            state.email = "";
            state.password = "";
        },
        [types.RESET_REGISTER_FORM](state) {
            state.name = "";
            state.email = "";
            state.password = ""
        },
        [types.TOGGLE_VIEW_USER](state) {
            state.viewUser = !state.viewUser;
        }
    },
    actions: {
        login({commit, state, dispatch}) {
            return new Promise((resolve, reject) => {
                commit(types.ATTEMPT_LOGIN);

                authService.login({
                    "email": state.email,
                    "password": state.password
                })
                    .then(user => {
                        commit(types.LOGIN_SUCCESS, user);
                        dispatch('setToken');
                        resolve(user);
                    }).catch(e => {
                    commit(types.LOGIN_FAILURE, "Email or password was incorrect");
                    reject(e);
                })
            })
        },
        register({commit, state, dispatch}) {
            return new Promise((resolve, reject) => {
                commit(types.ATTEMPT_REGISTER);

                authService.register({
                    "name": state.name,
                    "email": state.email,
                    "password": state.password
                })
                    .then(user => {
                        commit(types.REGISTER_SUCCESS, user);
                        dispatch('setToken');
                        resolve(user);
                    }).catch(e => {
                    commit(types.REGISTER_FAILURE, "Registration failed, try again.");
                    reject(e);
                })
            });
        },
        setToken({commit, state}) {
            commit(types.SET_TOKEN, state.user.token);
        },
        async fetchUser({commit}) {
            try {
                await authService.user()
                    .then(user => {
                        commit(types.FETCH_USER_SUCCESS, user);
                    })
            } catch (e) {
                commit(types.FETCH_USER_FAILURE);
            }
        },
        async logout({commit}) {
            commit(types.ATTEMPT_LOGOUT);

            try {
                await authService.logout()
                    .then(() => {
                        commit(types.LOGOUT_SUCCESS);
                    })
            } catch (e) {
                commit(types.LOGOUT_FAILURE);
            }
        },
        resetLoginForm({commit}) {
            commit(types.RESET_LOGIN_FORM);
        },
        resetRegisterForm({commit}) {
            commit(types.RESET_REGISTER_FORM);
        },
        toggleViewUser({commit}) {
            commit(types.TOGGLE_VIEW_USER);
        }
    }
}
