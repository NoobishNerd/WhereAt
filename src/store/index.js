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
      if (state.users.length != 0 ) {
        return state.users[state.users.length - 1].id;
      } else {
        return 0;
      }
    },

    getLastRestaurantId(state) {
      if (state.restaurants.length != 0 ) {
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
          profilePic: "https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg",
          phone: "",
          admin: false
        });

        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic = "https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg"
        state.loggedUser.type = "client"  
        state.loggedUser.admin = false;

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
          profilePic: "https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg",
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
        state.loggedUser.profilePic = "https://upload.wikimedia.org/wikipedia/en/8/8b/Purplecom.jpg"
        state.loggedUser.type = "restaurant"  
        state.loggedUser.admin = false;

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
            id: payload.id,
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
            id: payload.id,
            item: payload.item,
            itemType:payload.itemType,
            price:payload.price
          });
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Item adicionado!")
        }
      }
    },

    REMOVE_ITEM(state, payload) {
      let newItemId = 0 //para reescrever o id de todas as tables 
      let newItemArray = []
      for(let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          for (let item of restaurant.menu){
            if(payload.id != item.id){
              item.id = newItemId
              newItemArray.push(item)
              newItemId ++
            }
          }
          restaurant.menu = newItemArray
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Item removido!")
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

    CHANGE_USER_IMG(state, payload) {
      for (let user of state.users){
        if (user.id == payload.id){
          user.profilePic = payload.profilePic
          alert("Imagem de Perfil Mudada!")
        }
      }
      localStorage.setItem("users", JSON.stringify(state.users))
    },


    VACATION(state, payload){
      
      alert(payload.id)
      for (let restaurant  of state.restaurants) {
        alert(restaurant.id)
        if (payload.id == restaurant.id) {
          alert("yeah")
          if(restaurant.available){
            restaurant.available = false
            alert("Now its false")
          }else{
            restaurant.available = true
            alert("Now its tru")
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
            profilePic: "https://i.ytimg.com/vi/zQ4LiyFF8RU/hqdefault.jpg",
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
            profilePic: "data:image/png;base64,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",
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
            profilePic: "data:image/png;base64,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",
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
            profilePic: "data:image/png;base64,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",
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
