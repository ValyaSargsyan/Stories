import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'https://cf-endpoint-proxy.herokuapp.com/webapi/v1/';


const state = {
    stories: null,
};

const mutations = {
    setStories(state, data) {
        state.stories = data
    },
};

const actions = {
     getStories({commit}) {
         axios
            .get('/stories')
            .then((result) => {
                console.log("res", result.data)
                commit('setStories', result.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
};

const getters = {
    stories: state => state.stories,
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})