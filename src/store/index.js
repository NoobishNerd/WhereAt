import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    //array de users (c/exmplos pra testar)
    users: [
      {username:"Rui", 
      password:"chato", 
      email:"bitaites@gmail.com",
      admin: false},

      {username:"Zé Mockups", 
      password:"12345", 
      email:"where@",
      admin: true}
    ],

    
    //array de restaurantes (c/exmplos pra testar)
    restaurants: [
      {username:"McRui", 
      password:"chato", 
      email:"yo@gmail.com",
      }

    ],

    //o moorre fez isto ele deve saber
    x: 0,

    //bool pa dar check se alguém está autenticado
    logged: false,

    //utilizador logado
    loggedUser: {},

    //variável para a função login
    existUser: false
  },

  getters: {

    //get last user Id in array
    lastId(state) {
      if (!state.users.length) {
        return state.users[state.users.length - 1].id
      } else {
        return 0
      }
      
    }
  },

  mutations: {

    //where is this?
    UPDATE_X(state, payload) {
      state.x = payload
    },

    ADD_USER(state, payload) {
      //check se email já está registado
      if (!state.users.some(
          user => user.email === payload.email
        )) {
        
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
        alert("E-MAIL JÁ EXISTENTE")
      }

    },

    LOGIN(state, payload) {
      //check se conta existe
      for (const user of state.users) {
        if (user.email === payload.email && user.password === payload.password) {
          state.loggedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
          }
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
    },

    LOGOUT(state){
      state.loggedUser = {}

      state.logged = false;
    }

  },

  //maybe someday, when we have ACTUAL time...
  actions: {},
  modules: {}
  
});
