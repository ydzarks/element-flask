import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import ElementFlask from "../src/index";

import "sanitize.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { size: "mini", zIndex: 3000 });
Vue.use(ElementFlask);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
