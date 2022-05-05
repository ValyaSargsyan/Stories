import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";

import ClickOutside from 'vue-click-outside'
Vue.directive('click-outside', ClickOutside)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
