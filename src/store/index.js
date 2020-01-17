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
    },

    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },

    getSearchResults: (state) => (searchText) => {
      return state.restaurants.filter(restaurant => restaurant.username.includes(searchText) || restaurant.adress.includes(searchText) || restaurant.local.includes(searchText) ) //tags not implemented || restaurant.tags === searchText
    },

    getLoggedUser: (state) => {
      return state.loggedUser
    },


    getAvailableTables: (state) => (date, id, tables) => {
      let availableTables = tables
      for (const reservation of state.bookingHistory) {
        //se estiver confirmada & for à mesma hora no mesmo restaurante
        if(reservation.confirmation && reservation.id_restaurant == id && reservation.date == date){
          for (let i= 0; i < reservation.num_people.length; i++) {
              for (let j= 0; j < availableTables.length; j++) {
              if(availableTables[j] == reservation.num_people[i])
                availableTables[j] = `Mesa para ${availableTables[j]} - reservada`
              break;
            }
          }
        }
      }
      return availableTables
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

      } else {
        alert("E-MAIL JÁ REGISTADO");
      }
    },

    ADD_TABLE(state, payload) {
      for(let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          restaurant.tables.push({
            id: payload.id + 1,
            capacity: payload.capacity
          });
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Mesa Adicionada!")
        } 
      }
    },

    REMOVE_TABLE(state, payload) {
      let newTableId = 0 //para reescrever o id de todas as tables 
      let newTableArray = []
      for(let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          for (let table of restaurant.tables){
            if(payload.removeId != table.id){
              table.id = newTableId
              newTableArray.push(table)
              newTableId ++
            }
          }
          restaurant.tables = newTableArray
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Mesa Removida!")
        }
      }
    },

    ADD_ITEM(state, payload) {
      for (let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          restaurant.menu.push({
            id: payload.id + 1,
            item: payload.item,
            itemType:payload.itemType,
            price:payload.price
          });
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Item adicionado!")
        }
      }
    },

    LOGIN(state, payload) {
      if (payload.type == "client") {
        //check se conta existe
        //substituir alerts por returns de strings?
        for (const user of state.users) {
          if (
            user.email === payload.email &&
            user.password === payload.password
          ) {
            state.loggedUser.type = "client"
            state.loggedUser.admin = user.admin;
            state.loggedUser.id = user.id;
            state.loggedUser.username = user.username;
            state.loggedUser.profilePic = user.profilePic;

            localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

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
            state.loggedUser.type = "restaurant"
            state.loggedUser.admin = false;
            state.loggedUser.id = restaurant.id;
            state.loggedUser.username = restaurant.username;
            state.loggedUser.profilePic = restaurant.profilePic;

            localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

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

    CHANGE_USER_PROFILE(state, payload) {
      let newUserArray = []
      for (let user of state.users){
        if (user.id == payload.id){
          newUserArray.push(payload)
          alert("Alterações Salvas")
        }else{
          newUserArray.push(user)
        }
      }
      state.users = newUserArray
    },


    VACATION(state, payload){
      
      alert(payload.id)
      for (let restaurant  of state.restaurants) {
        alert(restaurant.id)
        if (payload.id == restaurant.id) {
          alert("yeah")
          if(restaurant.available){
            restaurant.available = false
            return false
          }else{
            restaurant.available = true
            return true
          }
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
    },


    
    CREATE_BASE(state) {
      if(localStorage.getItem("loggedUser")){
        if(localStorage.getItem("loggedUser") != ""){
          state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
          state.logged = true
        }
      }

      if (!localStorage.getItem("users")) {
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
            profilePic: "https://i.imgur.com/jr7av.jpg",
            phone: "",
            admin: true
          }
        ];

        localStorage.setItem("users", JSON.stringify(state.users))
      }else{
        state.users = JSON.parse(localStorage.getItem("users"));
      }

      if (!localStorage.getItem("restaurants")) {
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
            comments: [{id: 0, username:"Best Girl Vibe Check" , profilePic: "https://cdn.discordapp.com/attachments/640604184965677072/665652451877322762/25a39n98i7a41.png", rate: 5, text: "Nice place, i bet they make a lot of money", userId:42}],
            tags: [],
            menu: [],
            tables: [{
                id: 0,
                capacity: 4
              },
              {
                id: 1,
                capacity: 4
              },
              {
                id: 2,
                capacity: 2
              },
              {
                id: 3,
                capacity: 3
              },
            ],
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
            available: true,
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

        localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
      }else{
        state.restaurants = JSON.parse(localStorage.getItem("restaurants"));
      }
    }
  },

  //maybe someday, when we have ACTUAL time...
  actions: {},
  modules: {}
});
