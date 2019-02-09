// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
	loading:require('common/img/default.png')
})

/* eslint-disable no-new */

fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
