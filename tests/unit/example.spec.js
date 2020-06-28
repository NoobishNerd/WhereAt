import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import Home from "@/views/Home.vue";
import ClientProfile from "@/views/ClientProfile.vue";
import VueRouter from "vue-router"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const localVue = createLocalVue()
localVue.use(VueRouter)


const routes= [{path: "/clientProfile/1" , component:ClientProfile}]

const router = new VueRouter({
  routes
})

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
    const wrapper = mount(NavBar, {
      store: mock
    });
    // eslint-disable-next-line no-console
    console.log(wrapper)
    expect(wrapper.find("#loggedImg").src).toEqual("https://cdn.olhares.pt/client/files/foto/big/195/1956951.jpg");
  });
});

describe("HOME PAGE", () => {
  test("restaurant with id 1 exists in home page", () => {
    const wrapper = mount(Home, {
      store: mock
    });
    expect(wrapper.find("#restauranteN1").isVisible()).toBe(true);
  });
});

describe("PROFILE", () => {
  test("check if profile name is modelled after loggedUser", () => {
    jest.useFakeTimers()
    const wrapper = mount(ClientProfile, {
      store: mock,
      localVue,
      router
    });
    jest.advanceTimersByTime(3000)
    // eslint-disable-next-line no-console
    alert(wrapper.vm.$route)
    expect(wrapper.vm.$route).toBeInstanceOf(Object)
    expect(wrapper.vm.user.username).toBe("Sr.Alberto");
  });
});
