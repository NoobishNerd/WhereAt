import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueSweetalert2 from "vue-sweetalert2";


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "sweetalert2/dist/sweetalert2.min.css";

library.add(faChevronCircleLeft);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueSweetalert2);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
