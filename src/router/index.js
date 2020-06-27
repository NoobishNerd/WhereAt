import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/aboutRestaurant/:id",
    name: "aboutRestaurant",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutRestaurant.vue")
  },
  {
    //login cliente e restaurante
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login.vue")
  },
  {
    //login cliente e restaurante
    path: "/loginRestaurant",
    name: "loginRestaurant",
    component: () =>
      import(
        /* webpackChunkName: "loginRes" */ "../components/LoginRestaurant.vue"
      )
  },
  {
    //register cliente e restaurante
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../components/RegisterForm.vue"
      )
  },
  {
    //register cliente e restaurante
    path: "/registerRestaurant",
    name: "registerRestaurant",
    component: () =>
      import(
        /* webpackChunkName: "registerRestaurant" */ "../components/RegisterFormRestaurant.vue"
      )
  },
  {
    //register cliente e restaurante
    path: "/tableEditor",
    name: "tableEditor",
    component: () =>
      import(
        /* webpackChunkName: "tableEditor" */ "../components/TableEditor.vue"
      )
  },
  {
    path: "/clientProfile/:id",
    name: "clientProfile",
    component: () =>
      import(
        /* webpackChunkName: "clientProfile" */ "../views/ClientProfile.vue"
      )
  },
  {
    path: "/editRestaurantProfile/:id",
    name: "restaurantEditor",
    component: () =>
      import(
        /* webpackChunkName: "restaurantEditor" */ "../views/RestaurantEditor.vue"
      )
  },
  {
    path: "/restaurantProfile/:id",
    name: "restaurantProfile",
    component: () =>
      import(
        /* webpackChunkName: "restaurantEditor" */ "../views/RestaurantProfile.vue"
      )
  },
  {
    path: "/adminAuth",
    name: "adminAuth",
    component: () =>
      import(
        /* webpackChunkName: "restaurantEditor" */ "../components/AdminAuth.vue"
      )
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Secure.vue")
  }
];

const router = new VueRouter({
  routes
});

//navigation guard

export default router;
