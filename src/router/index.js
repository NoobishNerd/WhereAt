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
    path: "/aboutRestaurant",
    name: "aboutRestaurant",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    //register cliente e restaurante
    path: "/tableEditor",
    name: "tableEditor",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/TableEditor.vue")
  },
  {
    path: "/clientProfile",
    name: "clientProfile",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/ClientProfile.vue")

  },{
    path: "/editRestaurantProfile",
    name: "restaurantEditor",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/RestaurantEditor.vue")

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
