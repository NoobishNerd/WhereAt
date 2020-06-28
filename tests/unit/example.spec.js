import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";
import Home from "@/views/Home.vue";
import AboutRestaurant from "@/views/AboutRestaurant.vue";
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
 
});

describe("HOME PAGE", () => {
  test("if user is logged, recommendations are visible", () => {
    const wrapper = mount(Home, {
      store: mock
    });

    expect(wrapper.find("#recommendationText").isVisible()).toBe(true);
  });
});

describe("RESTAURANT PROFILE", () => {
  test("In restaurant profile, is information below the name visible", () =>{
    const wrapper = mount(AboutRestaurant,{
      store: mock
    });
    expect(wrapper.find("#restaurantInfoP").isVisible()).toBe(true);
  })

  test("In restaurant profile, is restaurant name is visible on top of the page", () =>{
    const wrapper = mount(AboutRestaurant,{
      store: mock
    });
    expect(wrapper.find("#restaurantNameH5").isVisible()).toBe(true);
  })

  test("In restaurant profile, does the map render", () =>{
    const wrapper = mount(AboutRestaurant,{
      store: mock
    });
    expect(wrapper.find("#myMap").isVisible()).toBe(true);
  })

  test("In restaurant profile, does the carousel render", () =>{
    const wrapper = mount(AboutRestaurant,{
      store: mock
    });
    expect(wrapper.find("#carouselExampleIndicators").isVisible()).toBe(true);
  })

  test("In restaurant profile, render reservation button", () =>{
    const wrapper = mount(AboutRestaurant,{
      store: mock
    });
    expect(wrapper.find("#smallerButton").isVisible()).toBe(true);
  })
})

describe("CLIENT PROFILE", () => {
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