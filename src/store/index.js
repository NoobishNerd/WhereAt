import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //array com todas as reservas para algoritmo de recomendações
    bookingHistory: [],

    //array de users (c/exmplos pra testar)
    users: [],

    //array de restaurantes (c/exmplos pra testar)
    restaurants: [],

    //bool pa dar check se alguém está autenticado
    logged: false,

    //utilizador logado
    loggedUser: {
      id: "",
      username: "dorime",
      profilePic: "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg",
      admin: false
    },

    //variável para a função login
    existUser: false
  },

  getters: {
    //get last user Id in array
    getLastUserId(state) {
      if (!state.users.length) {
        return state.users[state.users.length - 1].id;
      } else {
        return 0;
      }
    },

    getLastRestaurantId(state) {
      if (!state.restaurants.length) {
        return state.restaurants[state.restaurants.length - 1].id;
      } else {
        return 0;
      }
    },

    getRestaurantById: (state) => (id) => {
      return state.restaurants.find(restaurant => restaurant.id === id)
    }
  
  },

  mutations: {
    ADD_USER(state, payload) {
      //check se email já está registado
      if (!state.users.some(user => user.email === payload.email)) {
        //adicionar novo user ao array
        state.users.push({
          id: payload.id,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          profilePic: "../assets/main_user.png",
          phone: "",
          admin: false
        });

        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic =
          "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg";

        state.logged = true;

        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

        alert("Registado");

        //levar user pra pagina inicial?
      } else {
        alert("E-MAIL JÁ REGISTADO");
      }
    },

    ADD_RESTAURANT(state, payload) {
      //check se email já está registado
      if (
        !state.restaurants.some(
          restaurant => restaurant.email === payload.email
        )
      ) {
        //adicionar novo restaurante ao array
        state.restaurants.push({
          id: payload.id,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          profilePic: "../assets/main_user.png",
          phone: "",
          address: payload.address,
          approval: false,
          available: true,
          postalCode: "",
          info: "Pode colocar aqui a informação do seu restaurante",
          album: [],
          promotions: [],
          comments: [],
          tags: [],
          menu: [],
          tables: [],
          reservations: []
        });

        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic =
          "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg";

        state.logged = true;

        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

        alert("Registado");

        //levar user pra pagina inicial?
      } else {
        alert("E-MAIL JÁ REGISTADO");
      }
    },

    LOGIN(state, payload) {
      if (payload.type == "client") {
        //check se conta existe
        //substituir alerts por returns de strings
        for (const user of state.users) {
          if (
            user.email === payload.email &&
            user.password === payload.password
          ) {
            state.loggedUser.admin = user.admin;
            state.loggedUser.id = user.id;
            state.loggedUser.username = user.username;
            state.loggedUser.profilePic = user.profilePic;

            localStorage.setItem(
              "loggedUser",
              JSON.stringify(state.loggedUser)
            );
            alert("LOGIN");

            state.existUser = true;
          }
        }
        if (state.existUser === false) {
          alert("Credenciais Inválidas");
        } else {
          state.existUser = false;
          state.logged = true;
        }
      }

      if (payload.type == "restaurant") {
        for (const restaurant of state.restaurants) {
          if (
            restaurant.email === payload.email &&
            restaurant.password === payload.password
          ) {
            state.loggedUser = {
              id: restaurant.id,
              username: restaurant.username,
              email: restaurant.email,
              password: restaurant.password
            };
            localStorage.setItem(
              "loggedUser",
              JSON.stringify(state.loggedUser)
            );
            alert("LOGIN");
            state.existUser = true;
          }
        }
        if (state.existUser === false) {
          alert("Credenciais Inválidas");
        } else {
          state.existUser = false;
          state.logged = true;
        }
      }
    },

    LOGOUT(state) {
      state.loggedUser = {};
      state.logged = false;
    },

    CREATE_BASE(state) {
      if (!state.users.length) {
        state.users = [
          {
            id: 0,
            username: "Rui",
            password: "chato",
            email: "bitaites@gmail.com",
            profilePic: "../assets/main_user.png",
            phone: "",
            admin: false
          },

          {
            id: 1,
            username: "Zé Mockups",
            password: "12345",
            email: "where@mail",
            profilePic: "../assets/main_user.png",
            phone: "",
            admin: true
          }
        ];
      }
      if (!state.restaurants.length) {
        state.restaurants = [
          {
            id: 0,
            username: "McRui",
            password: "chato",
            email: "yo@gmail.com",
            profilePic: "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg",
            adress: "Vila do Conde",
            approval: true,
            available: true,
            postalCode: "4480-912",
            local: "não sei onde é dread",
            info: "descritivo do restaurante",
            album: [],
            promotions: [],
            comments: [],
            tags: [],
            menu: [],
            tables: [],
            reservations: [],
            phone: ""
          },
          {
            id: 1,
            username: "McRui 2",
            password: "chato",
            email: "nah@gmail.com",
            profilePic: "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg",
            adress: "Vila del Conde",
            approval: false,
            available: false,
            postalCode: "4480-912",
            local: "não sei onde é dread v2",
            info: "a sequela",
            album: [],
            promotions: [],
            comments: [],
            tags: [],
            menu: [],
            tables: [],
            reservations: [],
            phone: "91199porfavornaumincomode"
          },
          {
            id: 2,
            username: "clone",
            password: "x",
            email: "x@x",
            profilePic: "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg",
            adress: "Vila del Conde",
            approval: false,
            available: false,
            postalCode: "4480-912",
            local: "não sei onde é dread v3",
            info: "a sequela",
            album: [],
            promotions: [],
            comments: [],
            tags: [],
            menu: [],
            tables: [],
            reservations: [],
            phone: "91199porfavornaumincomode"
          }
        ];
      }
    }
  },

  //maybe someday, when we have ACTUAL time...
  actions: {},
  modules: {}
});
