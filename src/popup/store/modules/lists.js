import _ from "lodash";
import * as types from "../mutation-types";
import {api} from "../../api";

export default {
    namespaced: true,
    state: {
        lists: [],
        list: {},
        createList: false,
        creatingList: false,
        editList: false,
        editingList: false,
        listName: "",
        loading: false,
        sortLists: 'asc',
        sortListItems: 'desc'
    },
    getters: {
        sortedLists: state => {
            return _.orderBy(state.lists, ['name'], [state.sortLists]);
        },
        sortedListItems: state => {
            return _.orderBy(state.list.items, ['id'], [state.sortListItems]);
        },
        isLoading: state => {
            return state.loading;
        },
        isCreatingList: state => {
            return state.creatingList;
        },
        isEditingList: state => {
            return state.editingList;
        },
        listCount: state => {
            return state.lists.filter(list => list.name !== 'unlisted').length;
        },
        createList: state => {
            return state.createList;
        },
        editList: state => {
            return state.editList;
        },
        sortLists: state => {
            return state.sortLists;
        },
        sortListItems: state => {
            return state.sortListItems;
        },
        list: state => {
            return state.list;
        },
        listName: state => {
            return state.listName;
        },
        listItemCount: state => {
            return state.list.items.length;
        }
    },
    mutations: {
        [types.FETCH_LISTS](state) {
            state.loading = true;
        },
        [types.FETCH_LISTS_SUCCESS](state, payload) {
            state.lists = payload;
            state.loading = false;
        },
        [types.FETCH_LISTS_FAILURE](state) {
            state.lists = [];
            state.loading = false;
        },
        [types.TOGGLE_CREATE_LIST](state) {
            state.createList = !state.createList;
            state.creatingList = false;
        },
        [types.CREATE_LIST](state) {
            state.creatingList = true;
        },
        [types.CREATE_LIST_SUCCESS](state, payload) {
            state.listName = "";
            state.list = payload;
            state.createList = false;
            state.creatingList = false;
        },
        [types.CREATE_LIST_FAILURE](state) {
            state.createList = false;
            state.creatingList = false;
        },
        [types.SET_LIST_NAME](state, payload) {
            state.listName = payload;
        },
        [types.TOGGLE_SORT_LISTS](state, payload) {
            state.sortLists = payload;
        },
        [types.TOGGLE_SORT_LIST_ITEMS](state, payload) {
            state.sortListItems = payload;
        },
        [types.TOGGLE_EDIT_LIST](state) {
            state.editList = !state.editList;
            state.editingList = false;
        },
        [types.SET_LIST](state, payload) {
            state.list = payload;
            state.listName = payload.name;
        },
        [types.EDIT_LIST](state) {
            state.editingList = true;
        },
        [types.EDIT_LIST_SUCCESS](state, payload) {
            state.list = payload;
            state.listName = payload.name;
            state.editList = false;
            state.editingList = false;
        },
        [types.EDIT_LIST_FAILURE](state) {
            state.editList = false;
            state.editingList = false;
        },
        [types.DELETE_LIST_SUCCESS](state) {
            state.editList = false;
        },
        [types.DELETE_LIST_FAILURE](state) {
            state.editList = false;
        },
        [types.FETCH_LIST_SUCCESS](state, payload) {
            state.list = payload;
            state.listName = payload.name
        },
        [types.FETCH_LIST_FAILURE](state) {
            state.list = {};
        }
    },
    actions: {
        async fetchLists({commit}) {
            commit(types.FETCH_LISTS);

            try {
                const response = await api.get('lists');
                commit(types.FETCH_LISTS_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_LISTS_FAILURE);
            }
        },
        toggleCreateList({commit, state}) {
            commit(types.TOGGLE_CREATE_LIST);

            if (state.createList) {
                commit(types.SET_LIST_NAME, "");
            }
        },
        toggleEditList({commit}) {
            commit(types.TOGGLE_EDIT_LIST);
        },
        async createList({commit, rootState, state, dispatch}) {
            commit(types.CREATE_LIST);

            const user = rootState.auth.user;

            try {
                await api.post('lists', {
                    "name": state.listName,
                    "is_public": 0,
                    "user_id": user.id
                }).then(async response => {
                    dispatch('fetchLists');
                    commit(types.CREATE_LIST_SUCCESS, response.data.data);
                });
            } catch (e) {
                commit(types.CREATE_LIST_FAILURE);
            }
        },
        async editList({commit, state, dispatch}) {
            commit(types.EDIT_LIST);

            try {
                await api.put(`lists/${state.list.id}`, {
                    "name": state.listName,
                    "is_public": 0
                }).then(response => {
                    const list = response.data.data;
                    dispatch('fetchLists');
                    dispatch('items/fetchItems', null, {root: true});
                    commit(types.EDIT_LIST_SUCCESS, list);
                });
            } catch (e) {
                commit(types.EDIT_LIST_FAILURE);
            }
        },
        async deleteList({commit, state, dispatch}) {
            try {
                await api.delete(`lists/${state.list.id}`);
                dispatch('fetchLists');
                dispatch('items/fetchItems', null, {root: true});
                commit(types.DELETE_LIST_SUCCESS);
            } catch (e) {
                commit(types.DELETE_LIST_FAILURE);
            }
        },
        toggleSortLists({commit, state}) {
            if (state.sortLists === 'desc') {
                commit(types.TOGGLE_SORT_LISTS, 'asc');
            } else {
                commit(types.TOGGLE_SORT_LISTS, 'desc');
            }
        },
        toggleSortListItems({commit, state}) {
            if (state.sortListItems === 'desc') {
                commit(types.TOGGLE_SORT_LIST_ITEMS, 'asc');
            } else {
                commit(types.TOGGLE_SORT_LIST_ITEMS, 'desc');
            }
        },
        resetCreateListForm({commit}) {
            commit(types.RESET_CREATE_LIST_FORM);
        },
        viewList({commit}, list) {
            commit(types.SET_LIST, list);
        },
        fetchList({commit, state}, id) {
            const list = state.lists.find(list => list.id === id);

            if (list !== undefined) {
                commit(types.FETCH_LIST_SUCCESS, list);
            } else {
                commit(types.FETCH_LIST_FAILURE);
            }
        },
        setListName({commit}, listName) {
            commit(types.SET_LIST_NAME, listName);
        }
    }
}
