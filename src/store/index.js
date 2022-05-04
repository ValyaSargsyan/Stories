import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/';


const state = {
    stories: [],
    nextPage: null,
    loading: false,
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
};

const actions = {
     getStories({state, commit}, data) {
         commit("setLoading", true)
         // 'next_page': '38e50943-62f1-46da-923f-7d0cb8646ea9'
         console.log(data, "data")
         axios
            .get('/stories', {params: {...data} })
            .then((result) => {
                commit('setStories', [...state.stories,...result.data.stories])

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