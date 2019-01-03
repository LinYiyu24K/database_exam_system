import Vue from 'vue'
import Router from 'vue-router'
import staticRouter from './staticRouter'

Vue.use(Router)

export default new Router({
  routes: staticRouter
})
