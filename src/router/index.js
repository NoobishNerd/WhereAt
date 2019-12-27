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
    path: "/profileRestaurant",
    name: "aboutRestaurant",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    //login cliente e restaurante
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login.vue")

  },
  {
    //register cliente e restaurante
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/RegisterForm.vue")
    
  },
  {
    //register cliente e restaurante
    path: "/registerRestaurant",
    name: "registerRestaurant",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/RegisterFormRestaurant.vue")
  },
  {
    path: "/profileClient",
    name: "profileClient"

  },{
    path: "/editRestaurantProfile",
    name: "profileEditor"
  },
  {
    path: "/editPromotion",
    name: "promotioneditor"
  },
  {
    path: "/editMenu",
    name: "menuEditor"
  }
];

const router = new VueRouter({
  routes
});


//navigation guard

export default router;
