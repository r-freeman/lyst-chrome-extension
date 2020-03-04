import * as types from "../mutation-types";
import {api} from "../../api";

export default {
    namespaced: true,
    state: {
        stores: []
    },
    getters: {
        stores: state => {
            return state.stores;
        }
    },
    mutations: {
        [types.FETCH_STORES_SUCCESS](state, payload) {
            state.stores = payload;
        },
        [types.FETCH_STORES_FAILURE](state) {
            state.stores = [];
        }
    },
    actions: {
        async fetchStores({commit}) {
            try {
                const response = await api.get('stores');
                commit(types.FETCH_STORES_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_STORES_FAILURE);
            }
        }
    }
};