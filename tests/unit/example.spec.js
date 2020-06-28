import { shallowMount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import Home from "@/views/Home.vue";
import ClientProfile from "@/views/ClientProfile.vue";

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let mock =  new Vuex.Store({
  state: {
    //array com todas as reservas para algoritmo de recomendações
    bookingHistory: [],

    //array de users (c/exmplos pra testar)
    users: [],

    //array de restaurantes (c/exmplos pra testar)
    restaurants: [],

    //bool pa dar check se alguém está autenticado
    logged: true,

    //utilizador logado
    loggedUser: {
      id: 1,
      username: "Sr.Alberto",
      profilePic: "https://cdn.olhares.pt/client/files/foto/big/195/1956951.jpg",
      admin: 1
    }
  }
})
describe("NAVBAR", () => {
  test("if logged in is false, main user image is visible", () => {
    const wrapper = shallowMount(NavBar, {
      store: mock
    });
    expect(wrapper.find("#main_userImg").isVisible()).toBe(true);
  });
  test("if logged in is true, main user image is visible", () => {
    const wrapper = shallowMount(NavBar, {
      store: mock
    });
    expect(wrapper.find("#loggedImg").src).toEqual("https://cdn.olhares.pt/client/files/foto/big/195/1956951.jpg");
  });
});

// describe("HOME PAGE", () => {
//   test("if logged in is true, recommendations exist", () => {
//     const wrapper = shallowMount(Home, {
//       store: mock
//     });
//     expect(wrapper.find("#recommendationText").isVisible()).toBe(true);
//   });
//   test("restaurant with id 1 exists in home page", () => {
//     const wrapper = shallowMount(Home, {
//       store: mock
//     });
//     expect(wrapper.find("#restauranteN1").isVisible()).toBe(true);
//   });
// });

// describe("PROFILE", () => {
//   test("check if profile name is modelled after loggedUser", () => {
//     const wrapper = shallowMount(ClientProfile, {store: mock});
//     expect(wrapper.find("#nameTxt").value).toEqual("Sr.Alberto");
//   });
// });
