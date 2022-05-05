import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/';


const state = {
    stories: [],
    nextPage: null,
    loading: false,
    order_by: '',
    languages: [],
};

const mutations = {
    setStories(state, data) {
        state.stories = data
    },
    setNextPage(state, data) {
        state.nextPage = data
    },
    setLoading(state, data) {
        state.loading = data
    },
    setOrderBy(state, data) {
        state.order_by = data
    },
    setLanguages(state, data) {
        state.languages = data
    },
};

const actions = {
    getStories({state, commit}, payload) {
        const data = {...payload}
        if (state.order_by) {
            data.order_by = state.order_by
        }
        if (state.languages.length) {
            data.languages = state.languages.join()
        }
        commit("setLoading", true)
        axios
            .get('/stories', {params: {...data}})
            .then((result) => {
                if (payload && payload.next_page) {
                    commit('setStories', [...state.stories, ...result.data.stories])
                } else {
                    commit('setStories', result.data.stories)
                }
                commit('setNextPage', result.data['next_page_token'])
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                commit("setLoading", false)
            })
    },
};

const getters = {
    stories: state => state.stories,
    nextPage: state => state.nextPage,
    loading: state => state.loading,
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})