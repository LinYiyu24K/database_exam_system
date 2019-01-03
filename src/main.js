// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mock from './mock/index'
import ElementUI from 'element-ui'
import VueScroll from 'vuescroll'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/common.css'

Vue.config.productionTip = false

// Mock.mockData()
Vue.use(ElementUI)
Vue.use(VueScroll, {ops: {bar: {background: '#C0C4CC'}}})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
