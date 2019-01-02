// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/index.css'
import Http from './plugins/http'
import moment from 'moment'
Vue.config.productionTip = false
// Vue.prototype.$http =axios

Vue.use(ElementUI)
Vue.use(Http)
Vue.filter('format',(v)=>{
  return moment().format('YYYY-MM-DD');
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
