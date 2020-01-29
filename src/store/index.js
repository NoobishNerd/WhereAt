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
      return state.restaurants.find(restaurant => restaurant.id == id)
    },

    getUserById: (state) => (id) => {
      return state.users.find(user => user.id == id)
    },

    getReservsByRestId: (state) => (id) => {
      return state.bookingHistory.filter(reservation => reservation.id_restaurant === id)
    },

    getReservsByClntId: (state) => (id) => {
      alert(id)
      return state.bookingHistory.filter(reservation => reservation.id_client === id)
    },

    getSearchResults: (state) => (searchText) => {
      return state.restaurants.filter(restaurant => restaurant.username.toLowerCase().includes(searchText.toLowerCase())) /*|| restaurant.address.includes(searchText) || restaurant.local.includes(searchText))*/  //tags not implemented || restaurant.tags == searchText
    },

    getLoggedUser: (state) => {
      return state.loggedUser
    },


    getAvailableTables: (state) => (date, id, tables) => {
      let availableTables = []
      let capacity = true
      for (let table of tables) {
        for (const reservation of state.bookingHistory) {
          if(table.id == reservation.sltdTable.id && reservation.confirmation == "c" 
            && reservation.date == date && reservation.id_restaurant == id){
            alert("mesa ocupada: " + table.id)
            capacity = false //estando a mesa ocupada adiciona-se com capcidade 0
          }
        }
        if(capacity == false){
          availableTables.push({
            id: table.id,
            capacity: 0
          })
          capacity = true
        }else{
          availableTables.push({
            id: table.id,
            capacity: table.capacity
          })
        }
        
      }
      
      return availableTables
    },

    getCommentAuth: (state) => (userId, restaurantId) => {
      for (const reservation of state.bookingHistory){
        if (reservation.id_client == userId && reservation.id_restaurant == restaurantId && reservation.presence == true){
          return true
        }
      }
      return false
    }
  },

  mutations: {
    ADD_USER(state, payload) {
      //check se email já está registado
      if (!state.users.some(user => user.email == payload.email)) {
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
          restaurant => restaurant.email == payload.email
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

    REMOVE_PHOTO(state, payload) {
      let newPhotoId = 0 //para reescrever o id de todas as tables 
      let newAlbum = []
      for(let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          for (let photo of restaurant.album){
            if(payload.removeId != photo.id){
              photo.id = newPhotoId
              newAlbum.push(photo)
              newPhotoId ++
            }
          }
          restaurant.album = newAlbum
          localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
          alert("Foto Removida!")
        }
      }
    },

    ADD_PHOTO(state, payload) {
      let newId
      for (let restaurant of state.restaurants){
        if (restaurant.id == payload.id){
          
          newId = (restaurant.album.length != 0) ? restaurant.album[restaurant.album.length-1].id + 1 : 0 ;
          restaurant.album.push({
            id: newId,
            url: payload.url
          })
          alert("Foto Adicionada!")
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
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

    CHANGE_PRINCIPAL_TAG(state, payload) {
      for (let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          for (let tag of restaurant.tags){
            if (tag.id == payload.tagId){
              tag.principal = true
            }
            else{
              tag.principal = false
            }
          }
        }
      }      
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
      alert("Tag principal mudada!")
    },

    ADD_COMMENT(state, payload){
      for(let restaurant of state.restaurants){
        if (restaurant.id == payload.restaurantId){
          restaurant.comments.push({
            id: payload.commentId, 
            username: payload.username, 
            profilePic: payload.profilePic, 
            rate: payload.rate, 
            text: payload.text, 
            userId: payload.userId,
            date: payload.date 
          })

          alert("Comentário Adicionado")
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
    },

    LOGIN(state, payload) {
      if (payload.type == "client") {
        //check se conta existe
        //substituir alerts por returns de strings?
        for (const user of state.users) {
          if (
            user.email == payload.email &&
            user.password == payload.password
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
        if (state.existUser == false) {
          alert("Credenciais Inválidas");
        } else {
          state.existUser = false;
          state.logged = true;
        }
      }

      if (payload.type == "restaurant") {
        for (const restaurant of state.restaurants) {
          if (
            restaurant.email == payload.email &&
            restaurant.password == payload.password
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
        if (state.existUser == false) {
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
      localStorage.setItem("users", JSON.stringify(state.users))
    },

    CHANGE_USER_IMG(state, payload) {
      for (let user of state.users){
        if (user.id == payload.id){
          user.profilePic = payload.profilePic
          alert("Imagem de Perfil Mudada!")
          state.loggedUser.profilePic = payload.profilePic
        }
      }
      localStorage.setItem("users", JSON.stringify(state.users))
    },

    CHANGE_RESTAURANT_IMG(state, payload) {
      for (let restaurant of state.restaurants){
        if (restaurant.id == payload.id){
          restaurant.profilePic = payload.profilePic
          alert("Imagem de Perfil Mudada!")
          state.loggedUser.profilePic = payload.profilePic
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
    },

    VACATION(state, payload){
      for (let restaurant  of state.restaurants) {
        if (payload.id == restaurant.id) {
          if(restaurant.available){
            restaurant.available = false
            alert("O restaurante está agora de férias!")
          }else{
            restaurant.available = true
            alert("Reservas reativadas!")
          }
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants))
    },

    ADD_RESERVATION(state, payload){
      state.bookingHistory.push({
        id_restaurant: payload.id_restaurant,
        id_client: payload.id_client,
        hour: payload.hour,
        date: payload.date,
        dateOfRes: payload.dateOfRes, 
        sltdTable: payload.sltdTable,
        presence: payload.presence,
        confirmation: payload.confirmation
      })
      alert("Pedido Enviado")
      localStorage.setItem("bookingHistory",JSON.stringify( state.bookingHistory))    
    },

    MANAGE_RESERVATION(state, payload){
      for (let reservation of state.bookingHistory) {
        if (reservation.date == payload.date && reservation.hour == payload.hour && 
          reservation.id_client == payload.id_client && reservation.id_restaurant == payload.id_restaurant 
          && reservation.sltdTable.id == payload.tableId && reservation.dateOfRes == payload.dateOfRes) {
          reservation.confirmation = payload.action
          alert(reservation.confirmation)
        }
      }
      localStorage.setItem("bookingHistory",JSON.stringify( state.bookingHistory))    
    },

    AUTHORIZE_COMMENT(state, payload){
      for (let reservation of state.bookingHistory) {
        if (reservation.date == payload.date && reservation.hour == payload.hour && 
          reservation.id_client == payload.id_client && reservation.id_restaurant == payload.id_restaurant 
          && reservation.sltdTable.id == payload.tableId) {
          reservation.presence = true
          alert(reservation.presence)
        }
      }
      localStorage.setItem("bookingHistory",JSON.stringify( state.bookingHistory))    
    },
    
    CREATE_BASE(state) {
      if(localStorage.getItem("loggedUser")){
        if(localStorage.getItem("loggedUser") != ""){
          state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
          state.logged = true
        }
      }

      if(!localStorage.getItem("bookingHistory")){
        state.bookingHistory = [
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "23:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: {id: 0, capacity: 4},
            presence: true,
            confirmation: "c"
          },
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "23:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: {id: 0, capacity: 4},
            presence: false,
            confirmation: "p"
          },
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "23:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: {id: 0, capacity: 4},
            presence: false,
            confirmation: "d"
          },
        ];

        localStorage.setItem("bookingHistory", JSON.stringify(state.bookingHistory))


      }else{
        if(localStorage.getItem("bookingHistory") != ""){
          state.bookingHistory = JSON.parse(localStorage.getItem("bookingHistory"))
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
            username: "McDonald's - Vila do Conde",
            password: "chato",
            email: "yo@gmail.com",
            profilePic: "https://cdn.discordapp.com/attachments/499615761720147978/671159178345054218/unknown.png",
            address: "Estrada Nacional 13, Lugar da Portas Fronhas",
            approval: true,
            available: true,
            postalCode: "4480-739",
            local: "Vila do Conde",
            info: "descritivo do restaurante",
            album: [{id: 0, url:"https://i.imgur.com/hym8WuD.jpg"}, {id: 1, url:"https://i.imgur.com/MuH4mfH.jpg"}, {id: 2, url:"https://i.imgur.com/s6dX9yF.jpg"}, {id: 3, url:"https://i.imgur.com/tfEis8D.jpg"}],
            promotions: [],
            comments: [{id: 0, username:"Best Girl Vibe Check", profilePic: "https://cdn.discordapp.com/attachments/640604184965677072/665652451877322762/25a39n98i7a41.png", rate: 5, text: "Nice place, I bet they make a lot of money", userId:42},
            {id: 1, username:"ZéBitzz" , profilePic: "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4", rate: 2, text: "O site feio e eu aqui", userId:43}],
            tags: [{id: 0, tag_name:"Fast-Food", principal: true}, {id: 1, tag_name:"Vila", principal: false}, {id: 2, tag_name:"Saudável", principal: false}],
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
            phone: ""
          },
          {
            id: 1,
            username: "McRui 2",
            password: "chato",
            email: "nah@gmail.com",
            profilePic: "https://cdn.discordapp.com/attachments/499615761720147978/671159268887494686/unknown.png",
            address: "Vila del Conde",
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
            phone: "91199porfavornaumincomode"
          },
          {
            id: 2,
            username: "clone",
            password: "x",
            email: "x@x",
            profilePic: "https://dictionary.cambridge.org/pt/images/thumb/house_noun_002_18270.jpg?version=5.0.65",
            address: "Vila del Conde",
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
