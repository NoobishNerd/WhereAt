import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      {username:"Rui", 
      password:"chatodemerda", 
      email:"bitaites@gmail.com",
      admin: false},

      {username:"Zé Mockups", 
      password:"12345", 
      email:"where@",
      admin: true}
    ],

    restaurants: [
      {username:"McRui", 
      password:"chato", 
      email:"yo@gmail.com",
      }

    ],

    loggedUser: ""
  },
  mutations: {
    //resgiter    push pra users se válido

    //login     check users se existir , then loggedUser = cena

    //logout     loggedUser = null
  },
  getters: {
    isLogged: state => {
      return state.loggedUser.username
    }
  },
  
});
