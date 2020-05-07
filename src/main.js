import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// import './styles/element-variables.scss';

import '@/styles/index.scss' // global css

import Bmob from 'hydrogen-js-sdk'
import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Bmob.initialize('5969ff11f69505e9', '497637', '758dee64c6049d245171555e8f93d7ee')
Vue.use(Element, {
  size: localStorage.getItem('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
