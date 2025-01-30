import Vue from "vue";
import App from "./App.vue";

// Jika tidak ingin melihat pesan production tip
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
