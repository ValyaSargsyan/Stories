import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
