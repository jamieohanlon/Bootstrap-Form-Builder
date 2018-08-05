// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuesax from 'vuesax'

import formItem from "./components/FormItem.vue";
import 'material-icons/iconfont/material-icons.css';
import "vuesax/dist/vuesax.css";

Vue.use(Vuesax);

Vue.component("FormItem", formItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
