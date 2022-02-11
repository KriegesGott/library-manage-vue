import Vue from 'vue'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
