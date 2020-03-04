import _ from "lodash";
import storage from "../../storage";
import * as types from "../mutation-types";
import {api} from "../../api";

export default {
    namespaced: true,
    state: {
        items: [],
        item: {},
        _item: {},
        saveItem: false,
        savingItem: false,
        editItem: false,
        editingItem: false,
        itemListName: "",
        loading: false,
        sort: 'desc'
    },
    getters: {
        sortedItems: state => {
            return _.orderBy(state.items, ['id'], [state.sort]);
        },
        isLoading: state => {
            return state.loading;
        },
        isSavingItem: state => {
            return state.savingItem;
        },
        isEditingItem: state => {
            return state.editingItem;
        },
        itemCount: state => {
            return state.items.length;
        },
        item: state => {
            return state.item;
        },
        _item: state => {
            return state._item;
        },
        saveItem: state => {
            return state.saveItem;
        },
        editItem: state => {
            return state.editItem;
        },
        itemStore: state => {
            return state.item.store.name + ' ' + state.item.store.region;
        },
        _itemStore: state => {
            return state._item.store.name + ' ' + state._item.store.region;
        },
        sort: state => {
            return state.sort;
        }
    },
    mutations: {
        [types.FETCH_ITEMS](state) {
            state.loading = true;
        },
        [types.FETCH_ITEMS_SUCCESS](state, payload) {
            state.items = payload;
            state.loading = false;
        },
        [types.FETCH_ITEMS_FAILURE](state) {
            state.items = [];
            state.loading = false;
        },
        [types.FETCH_CAPTURED_ITEM_SUCCESS](state, payload) {
            state.item = payload;
        },
        [types.FETCH_CAPTURED_ITEM_FAILURE](state) {
            state.item = {};
        },
        [types.TOGGLE_SAVE_ITEM](state) {
            if (state.item) {
                state.saveItem = !state.saveItem;
                state.savingItem = false;
            }
        },
        [types.SAVE_ITEM](state) {
            state.savingItem = true;
        },
        [types.SAVE_ITEM_SUCCESS](state) {
            state.saveItem = false;
            state.savingItem = false;
        },
        [types.SAVE_ITEM_FAILURE](state) {
            state.savingItem = false;
            state.saveItem = false;
        },
        [types.SORT_ITEMS](state, payload) {
            state.sort = payload;
        },
        [types.TOGGLE_EDIT_ITEM](state, payload) {
            state._item = payload;
            state.editItem = !state.editItem;
            state.editingItem = false;
        },
        [types.SET_ITEM_LIST_NAME](state, payload) {
            state.itemListName = payload;
        },
        [types.DELETE_ITEM_SUCCESS](state) {
            state.editItem = false;
        },
        [types.DELETE_ITEM_FAILURE](state) {
            state.editItem = false;
        },
        [types.EDIT_ITEM](state) {
            state.editingItem = true;
        },
        [types.EDIT_ITEM_SUCCESS](state) {
            state.editItem = false;
            state.editingItem = false;
        },
        [types.EDIT_ITEM_FAILURE](state) {
            state.editItem = false;
            state.editingItem = false;
        },
    },
    actions: {
        async fetchItems({commit}) {
            commit(types.FETCH_ITEMS);

            try {
                const response = await api.get('items');
                commit(types.FETCH_ITEMS_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_ITEMS_FAILURE);
            }
        },
        fetchCapturedItem({commit}) {
            storage.getData('item')
                .then(item => {
                    commit(types.FETCH_CAPTURED_ITEM_SUCCESS, item);
                }).catch(e => {
                commit(types.FETCH_CAPTURED_ITEM_FAILURE);
            })
        },
        toggleSaveItem({commit, state, dispatch}) {
            commit(types.TOGGLE_SAVE_ITEM);

            if (state.saveItem) {
                dispatch('setItemListName', '');
            }
        },
        async saveItem({commit, rootState, state, dispatch}, update = false) {
            commit(types.SAVE_ITEM);

            const user = rootState.auth.user, stores = rootState.stores.stores;

            let list = {},
                item = (!update) ? state.item : state._item,
                lists = rootState.lists.lists,
                itemListName = state.itemListName;

            try {
                if (itemListName !== "") {
                    list = lists.find(list => list.name.toLowerCase() === itemListName.trim().toLowerCase());

                    // create a new list
                    if (_.isEmpty(list)) {
                        await dispatch('lists/setListName', itemListName, {root: true});
                        await dispatch('lists/createList', null, {root: true});
                        list = rootState.lists.list;
                    }
                }

                if (stores.length > 0 && item !== null) {
                    for (let store of stores) {
                        if (store.name === item.store.name && store.region === item.store.region) {
                            if (!update) {
                                await api.post('items', {
                                    "title": item.title,
                                    "image": item.image,
                                    "item_code": item.item_code,
                                    "price": item.price,
                                    "url": item.url,
                                    "store_id": store.id,
                                    "list_id": list.id
                                });
                            } else {
                                await api.put(`items/${item.id}`, {
                                    "list_id": list.id
                                });
                            }

                            dispatch('fetchItems');
                            dispatch('lists/fetchLists', null, {root: true});
                            commit(types.SAVE_ITEM_SUCCESS);
                            break;
                        }
                    }
                }
            } catch (e) {
                commit(types.SAVE_ITEM_FAILURE);
            }
        },
        async editItem({commit, dispatch}) {
            commit(types.EDIT_ITEM);

            try {
                await dispatch('saveItem', true);
                commit(types.EDIT_ITEM_SUCCESS);
            } catch (e) {
                commit(types.EDIT_ITEM_FAILURE);
            }
        },
        sortItems({commit, state}) {
            if (state.sort === 'desc') {
                commit(types.SORT_ITEMS, 'asc');
            } else {
                commit(types.SORT_ITEMS, 'desc');
            }
        },
        toggleEditItem({commit, state}, _item) {
            if (!state.editItem) {
                commit(types.TOGGLE_EDIT_ITEM, _item);
            } else {
                commit(types.TOGGLE_EDIT_ITEM, {});
            }
        },
        setItemListName({commit}, itemListName) {
            commit(types.SET_ITEM_LIST_NAME, itemListName);
        },
        async deleteItem({commit, state, dispatch}) {
            try {
                await api.delete(`items/${state._item.id}`);
                dispatch('fetchItems');
                dispatch('lists/fetchLists', null, {root: true});
                commit(types.DELETE_ITEM_SUCCESS);
            } catch (e) {
                commit(types.DELETE_ITEM_FAILURE);
            }
        }
    }
}
