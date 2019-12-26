import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    //array de users (c/exmplos pra testar)
    users: [],

    //array de restaurantes (c/exmplos pra testar)
    restaurants: [],

    //bool pa dar check se alguém está autenticado
    logged: false,

    //utilizador logado
    loggedUser: {},

    //variável para a função login
    existUser: false
  },

  getters: {

    //get last user Id in array
    getLastId(state) {
      if (!state.users.length) {
        return state.users[state.users.length - 1].id
      } else {
        return 0
      }
    },

  },

  mutations: {

    ADD_USER(state, payload) {

      //check se email já está registado
      if (!state.users.some(
          user => user.email === payload.email
        )) {

        //NOT HERE LMFAO
        //check se a password foi confirmada
        if (payload.password != payload.confPassword) {
          alert("PASSWORDS DIFERENTES")
        } else {
          //adicionar novo user ao array
          state.users.push({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            password: payload.password,
          });

          //user agora está registado e o login é feito
          state.loggedUser = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            password: payload.password,
          }

          state.logged = true;

          alert("Registado")

          //levar user pra pagina inicial?
        }
      } else {
        alert("E-MAIL JÁ REGISTADO")
      }

    },

    LOGIN(state, payload, type) {

      if (type == "client") {
        //check se conta existe
        //substituir alerts por returns de strings
        for (const user of state.users) {
          if (user.email === payload.email && user.password === payload.password) {
            state.loggedUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password
            }
            localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser))
            alert("LOGIN")
            state.existUser = true;
          }
        }
        if (state.existUser === false) {
          alert("Credenciais Inválidas")
        } else {
          state.existUser = false;
          state.logged = true;

        }
      } else if (type == "restaurant") {
        for (const restaurant of state.restaurants) {
          if (restaurant.email === payload.email && restaurant.password === payload.password) {
            state.loggedUser = {
              id: restaurant.id,
              name: restaurant.name,
              email: restaurant.email,
              password: restaurant.password
            }
            localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser))
            alert("LOGIN")
            state.existUser = true;
          }
        }
        if (state.existUser === false) {
          alert("Credenciais Inválidas")
        } else {
          state.existUser = false;
          state.logged = true;
        }
      }
    },

    LOGOUT(state) {
      state.loggedUser = {}
      state.logged = false;
    },




    CREATE_BASE(state) {
      if (state.users == []) {
        state.users = [{
            id: 0,
            username: "Rui",
            password: "chato",
            email: "bitaites@gmail.com",
            admin: false
          },

          {
            id: 1,
            username: "Zé Mockups",
            password: "12345",
            email: "where@mail",
            admin: true
          }
        ]
      }
      if (state.restaurants == []) {
        state.restaurants = [{
          id: 0,
          username: "McRui",
          password: "chato",
          email: "yo@gmail.com",
        }]
      }
    }

  },





  //maybe someday, when we have ACTUAL time...
  actions: {},
  modules: {}

});