import Vue from "vue";
import Vuex from "vuex";
import usersService from "../api/users.js";

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

    //variáveis para respostas do server
    request: null,
    status: null
  },

  getters: {
    getRestaurantById: state => id => {
      return state.restaurants.find(restaurant => restaurant.id == id);
    },

    getUserById: state => id => {
      return state.users.find(user => user.id == id);
    },

    getReservsByRestId: state => id => {
      return state.bookingHistory.filter(
        reservation => reservation.id_restaurant === id
      );
    },

    getReservsByClntId: state => id => {
      return state.bookingHistory.filter(
        reservation => reservation.id_client === id
      );
    },

    getSearchResults: state => (searchText, filter) => {
      alert(filter);
      // COMO REMOVER ACENTOS??
      if (filter == "") {
        return state.restaurants.filter(
          restaurant =>
            restaurant.username
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            restaurant.tags.find(tag =>
              tag.tag_name.toLowerCase().includes(searchText.toLowerCase())
            ) ||
            restaurant.address.toLowerCase().includes(searchText.toLowerCase())
        );
      } else {
        return state.restaurants.filter(
          restaurant =>
            (restaurant.username
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
              restaurant.tags.find(tag =>
                tag.tag_name.toLowerCase().includes(searchText.toLowerCase())
              ) ||
              restaurant.address
                .toLowerCase()
                .includes(searchText.toLowerCase())) &&
            restaurant.tags.find(tag =>
              tag.tag_name.toLowerCase().includes(filter.toLowerCase())
            )
        );
      }
    },

    getLoggedUser: state => {
      return state.loggedUser;
    },

    getAvailableTables: state => (hour, date, id, tables) => {
      let availableTables = [];
      let capacity = true;

      //hora como numero
      let numberHour = hour.slice(0, hour.indexOf(":"));

      //para testar intervalo de uma hora
      let hourIntervalMin;
      let hourIntervalMax;

      for (let table of tables) {
        for (const reservation of state.bookingHistory) {
          hourIntervalMin = parseInt(
            reservation.hour.slice(0, reservation.hour.indexOf(":"))
          );

          hourIntervalMax = hourIntervalMin + 1 == 24 ? 0 : hourIntervalMin + 1;

          if (
            table.id == reservation.sltdTable.id &&
            reservation.confirmation == "c" &&
            reservation.date == date &&
            reservation.id_restaurant == id &&
            (hourIntervalMin == numberHour || hourIntervalMax == numberHour)
          ) {
            //alert("mesa ocupada: " + table.id)
            capacity = false; //estando a mesa ocupada adiciona-se com capcidade 0
          }
        }
        if (capacity == false) {
          availableTables.push({
            id: table.id,
            capacity: 0
          });
          capacity = true;
        } else {
          availableTables.push({
            id: table.id,
            capacity: table.capacity
          });
        }
      }

      return availableTables;
    },

    getCommentAuth: state => (userId, restaurantId) => {
      for (const reservation of state.bookingHistory) {
        if (
          reservation.id_client == userId &&
          reservation.id_restaurant == restaurantId &&
          reservation.presence == true
        ) {
          return true;
        }
      }
      return false;
    }
  },

  mutations: {
    SET_REQUEST(state, payload) {
      state.request = payload;
    },

    SET_STATUS(state, payload) {
      state.status = payload;
    },

    ADD_USER(state, payload) {
      //check se email já está registado
      if (!state.users.some(user => user.email == payload.email)) {
        //adicionar novo user ao array
        state.users.push({
          id: payload.id,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          profilePic:
            "https://cdn.discordapp.com/attachments/499615761720147978/672478521742065678/gdlRcXX33aYFwAAAABJRU5ErkJggg.png",
          phone: "",
          admin: false
        });

        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic =
          "https://cdn.discordapp.com/attachments/499615761720147978/672478521742065678/gdlRcXX33aYFwAAAABJRU5ErkJggg.png";
        state.loggedUser.type = "client";
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
        !state.restaurants.some(restaurant => restaurant.email == payload.email)
      ) {
        //adicionar novo restaurante ao array
        state.restaurants.push({
          id: payload.id,
          username: payload.username,
          email: payload.email,
          password: payload.password,
          profilePic:
            "https://cdn.discordapp.com/attachments/499615761720147978/672478045864460337/adlib-home-2.png",
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
          tables: []
        });

        //user agora está registado e o login é feito
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic =
          "https://cdn.discordapp.com/attachments/499615761720147978/672478045864460337/adlib-home-2.png";
        state.loggedUser.type = "restaurant";
        state.loggedUser.admin = false;

        state.logged = true;

        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

        alert("Registado");
      } else {
        alert("E-MAIL JÁ REGISTADO");
      }
    },

    ADD_TABLE(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          restaurant.tables.push({
            id: payload.id,
            capacity: payload.capacity
          });
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Mesa Adicionada!");
        }
      }
    },

    REMOVE_TABLE(state, payload) {
      let newTableId = 0; //para reescrever o id de todas as tables
      let newTableArray = [];
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let table of restaurant.tables) {
            if (payload.removeId != table.id) {
              table.id = newTableId;
              newTableArray.push(table);
              newTableId++;
            }
          }
          restaurant.tables = newTableArray;
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Mesa Removida!");
        }
      }
    },

    REMOVE_PHOTO(state, payload) {
      let newPhotoId = 0; //para reescrever o id de todas as tables
      let newAlbum = [];
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let photo of restaurant.album) {
            if (payload.removeId != photo.id) {
              photo.id = newPhotoId;
              newAlbum.push(photo);
              newPhotoId++;
            }
          }
          restaurant.album = newAlbum;
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Foto Removida!");
        }
      }
    },

    ADD_PHOTO(state, payload) {
      let newId;
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.id) {
          newId =
            restaurant.album.length != 0
              ? restaurant.album[restaurant.album.length - 1].id + 1
              : 0;
          restaurant.album.push({
            id: newId,
            url: payload.url
          });
          alert("Foto Adicionada!");
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
    },

    ADD_ITEM(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          restaurant.menu.push({
            id: payload.id,
            item: payload.item,
            itemType: payload.itemType,
            price: payload.price
          });
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Item adicionado!");
        }
      }
    },

    REMOVE_ITEM(state, payload) {
      let newItemId = 0; //para reescrever o id de todas as tables
      let newItemArray = [];
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let item of restaurant.menu) {
            if (payload.id != item.id) {
              item.id = newItemId;
              newItemArray.push(item);
              newItemId++;
            }
          }
          restaurant.menu = newItemArray;
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Item removido!");
        }
      }
    },

    CHANGE_MAIN_TAG(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let tag of restaurant.tags) {
            if (tag.id == payload.tagId) {
              tag.main = true;
            } else {
              tag.main = false;
            }
          }
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
      alert("Tag principal alterada!");
    },

    ADD_TAG(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let tag of restaurant.tags) {
            if (tag.tag_name == payload.newTag) {
              alert("Categoria semelhante já adicionada!");
              return false;
            }
          }
          restaurant.tags.push({
            id: restaurant.tags.length,
            tag_name: payload.newTag,
            main: false
          });
          alert("Categoria Adicionada!");
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
      return true;
    },

    REMOVE_TAG(state, payload) {
      let newTagId = 0; //para reescrever o id de todas as tables
      let newTagArray = [];
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          for (let tag of restaurant.tags) {
            if (payload.id != tag.id) {
              tag.id = newTagId;
              newTagArray.push(tag);
              newTagId++;
            }
          }
          restaurant.tags = newTagArray;
          localStorage.setItem(
            "restaurants",
            JSON.stringify(state.restaurants)
          );
          alert("Categoria removida!");
        }
      }
    },

    ADD_PREF(state, payload) {
      for (let user of state.users) {
        if (user.id == payload.userId) {
          user.preferences.push({
            id: user.preferences.length,
            tag_name: payload.newTag,
            main: false
          });
        }
      }
      localStorage.setItem("users", JSON.stringify(state.users));
      return true;
    },

    REMOVE_PREF(state, payload) {
      let newTagId = 0; //para reescrever o id de todas as tables
      let newTagArray = [];
      for (let user of state.users) {
        if (user.id == payload.userId) {
          for (let tag of user.preferences) {
            if (payload.id != tag.id) {
              tag.id = newTagId;
              newTagArray.push(tag);
              newTagId++;
            }
          }
          user.preferences = newTagArray;
          localStorage.setItem("users", JSON.stringify(state.users));
          alert("Preferência removida!");
        }
      }
    },

    ADD_COMMENT(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.restaurantId) {
          restaurant.comments.push({
            id: payload.commentId,
            username: payload.username,
            profilePic: payload.profilePic,
            rate: payload.rate,
            text: payload.text,
            userId: payload.userId,
            date: payload.date
          });

          alert("Comentário Adicionado");
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
    },

    LOGIN(state, payload) {
      if (payload.type == "client") {
        state.loggedUser.type = "client";
        state.loggedUser.admin = payload.admin;
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic = payload.profilePic;

        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

        state.logged = true;
      }

      if (payload.type == "restaurant") {
        state.loggedUser.type = "restaurant";
        state.loggedUser.admin = false;
        state.loggedUser.id = payload.id;
        state.loggedUser.username = payload.username;
        state.loggedUser.profilePic = payload.profilePic;

        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));

        state.logged = true;
      }
    },

    LOGOUT(state) {
      state.loggedUser = {};
      state.logged = false;
    },

    CHANGE_USER_PROFILE(state, payload) {
      let newUserArray = [];
      for (let user of state.users) {
        if (user.id == payload.id) {
          newUserArray.push(payload);
          alert("Alterações Salvas");
        } else {
          newUserArray.push(user);
        }
      }
      state.users = newUserArray;
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    CHANGE_USER_IMG(state, payload) {
      state.loggedUser.profilePic = payload.profilePic;
      localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
    },

    CHANGE_RESTAURANT_IMG(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.id) {
          restaurant.profilePic = payload.profilePic;
          alert("Imagem de Perfil Mudada!");
          state.loggedUser.profilePic = payload.profilePic;
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
    },

    CHANGE_APPROVAL(state, payload) {
      for (let restaurant of state.restaurants) {
        if (restaurant.id == payload.id) {
          restaurant.approval = payload.value;
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
    },

    VACATION(state, payload) {
      for (let restaurant of state.restaurants) {
        if (payload.id == restaurant.id) {
          if (restaurant.available) {
            restaurant.available = false;
            alert("O restaurante está agora de férias!");
          } else {
            restaurant.available = true;
            alert("Reservas reativadas!");
          }
        }
      }
      localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
    },

    ADD_RESERVATION(state, payload) {
      state.bookingHistory.push({
        id_restaurant: payload.id_restaurant,
        id_client: payload.id_client,
        hour: payload.hour,
        date: payload.date,
        dateOfRes: payload.dateOfRes,
        sltdTable: payload.sltdTable,
        presence: payload.presence,
        confirmation: payload.confirmation
      });
      alert("Pedido Enviado");
      localStorage.setItem(
        "bookingHistory",
        JSON.stringify(state.bookingHistory)
      );
    },

    MANAGE_RESERVATION(state, payload) {
      for (let reservation of state.bookingHistory) {
        if (
          reservation.date == payload.date &&
          reservation.hour == payload.hour &&
          reservation.id_client == payload.id_client &&
          reservation.id_restaurant == payload.id_restaurant &&
          reservation.sltdTable.id == payload.tableId &&
          reservation.dateOfRes == payload.dateOfRes
        ) {
          reservation.confirmation = payload.action;
        }
      }
      localStorage.setItem(
        "bookingHistory",
        JSON.stringify(state.bookingHistory)
      );
    },

    AUTHORIZE_COMMENT(state, payload) {
      for (let reservation of state.bookingHistory) {
        if (
          reservation.date == payload.date &&
          reservation.hour == payload.hour &&
          reservation.id_client == payload.id_client &&
          reservation.id_restaurant == payload.id_restaurant &&
          reservation.sltdTable.id == payload.tableId
        ) {
          reservation.presence = true;
        }
      }
      localStorage.setItem(
        "bookingHistory",
        JSON.stringify(state.bookingHistory)
      );
    },

    CREATE_BASE(state) {
      if (localStorage.getItem("loggedUser")) {
        if (localStorage.getItem("loggedUser") != "") {
          state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
          state.logged = true;
        }
      }

      if (!localStorage.getItem("bookingHistory")) {
        state.bookingHistory = [
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "23:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: { id: 0, capacity: 4 },
            presence: true,
            confirmation: "c"
          },
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "11:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: { id: 0, capacity: 4 },
            presence: false,
            confirmation: "p"
          },
          {
            id_restaurant: 0,
            id_client: 1,
            hour: "6:59",
            date: "2020-12-31",
            dateOfRes: "15:15  24/1/2020",
            sltdTable: { id: 0, capacity: 4 },
            presence: false,
            confirmation: "d"
          }
        ];

        localStorage.setItem(
          "bookingHistory",
          JSON.stringify(state.bookingHistory)
        );
      } else {
        if (localStorage.getItem("bookingHistory") != "") {
          state.bookingHistory = JSON.parse(
            localStorage.getItem("bookingHistory")
          );
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
            admin: false,
            preferences: []
          },

          {
            id: 1,
            username: "Zé Mockups",
            password: "12345",
            email: "where@mail",
            profilePic: "https://i.imgur.com/jr7av.jpg",
            phone: "",
            admin: true,
            preferences: [
              { id: 0, tag_name: "Fast-Food", main: true },
              { id: 1, tag_name: "Vila", main: false },
              { id: 2, tag_name: "Saudável", main: false }
            ]
          }
        ];

        localStorage.setItem("users", JSON.stringify(state.users));
      } else {
        state.users = JSON.parse(localStorage.getItem("users"));
      }

      if (!localStorage.getItem("restaurants")) {
        state.restaurants = [
          {
            id: 0,
            username: "McDonald's - Vila do Conde",
            password: "chato",
            email: "yo@gmail.com",
            profilePic:
              "https://cdn.discordapp.com/attachments/499615761720147978/672170232181161994/unknown.png",
            address: "Estrada Nacional 13, Lugar da Portas Fronhas",
            approval: true,
            available: true,
            postalCode: "4480-739",
            local: "Vila do Conde",
            info:
              "Rede de fast-food conhecida por seus hambúrgueres, batatas fritas e milk shakes-shakes-shakes. Este estabelecimento em particular é mais do que só familiar para os estudantes universitários da região. :) párápäpápá",
            album: [
              { id: 0, url: "https://i.imgur.com/hym8WuD.jpg" },
              {
                id: 1,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672154045137289226/2Q.png"
              },
              {
                id: 2,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672154882425225216/334726.png"
              },
              {
                id: 3,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672155664042164242/308479_1.png"
              },
              {
                id: 4,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672155862453846056/nuggerts_770x433_acf_cropped.png"
              }
            ],
            comments: [
              {
                id: 0,
                username: "Luís Senpai - o",
                profilePic:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672157905771823104/cringe.jpg",
                rate: 3,
                text:
                  "Ya, eu não sei porque estou aqui, mas o facto de estar aqui significa alguma coisa...",
                userId: 9999
              },
              {
                id: 1,
                username: "      zÉ",
                profilePic:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672212073454764052/Screenshot_2020-01-29-22-50-25.jpg",
                rate: 5,
                text: "Manu, o que eu faço por um BIG MAC!",
                userId: 42
              },
              {
                id: 2,
                username: "Rei Rui D.D. Ferrari",
                profilePic:
                  "https://cdn.discordapp.com/attachments/516726056909275146/672165113054363648/IMG_20190511_224159.jpg",
                rate: 5,
                text: "Mano, não comia um hamburger à mais de 6 meses!",
                userId: 69420
              }
            ],
            tags: [
              { id: 0, tag_name: "Fast-Food", main: true },
              { id: 1, tag_name: "Vila", main: false },
              { id: 2, tag_name: "Saudável", main: false }
            ],
            menu: [
              { id: 0, item: "McNuggéts", itemType: "Entradas", price: "1.00" },
              { id: 1, item: "McWrap", itemType: "Entradas", price: "1.00" },
              { id: 2, item: "Iced Tea", itemType: "Bebidas", price: "1.50" },
              { id: 3, item: "AICE-T", itemType: "Bebidas", price: "1.50" },
              {
                id: 4,
                item: "Menu Big Mac c/ batata grande",
                itemType: "Carne",
                price: "4.50"
              },
              {
                id: 5,
                item: "Menu McRoyal Bacon c/ batata grande",
                itemType: "Carne",
                price: "6.00"
              },
              {
                id: 6,
                item: "Menu CBO c/ batata grande",
                itemType: "Carne",
                price: "6.00"
              }
            ],
            tables: [
              {
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
              }
            ],
            phone: 252638257
          },
          {
            id: 1,
            username: "McRui 2",
            password: "chato",
            email: "nah@gmail.com",
            profilePic:
              "https://cdn.discordapp.com/attachments/499615761720147978/671159268887494686/unknown.png",
            address: "Travessa das Águas Pares de 6 a 204 4000-001 Porto",
            approval: true,
            available: false,
            postalCode: "4000-001",
            local: "Porto",
            info: "a sequela",
            album: [
              {
                id: 0,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/671159268887494686/unknown.png"
              },
              {
                id: 1,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/671159268887494686/unknown.png"
              },
              {
                id: 2,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/671159268887494686/unknown.png"
              }
            ],
            comments: [
              {
                id: 0,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              }
            ],
            tags: [],
            menu: [],
            tables: [],
            phone: "91199porfavornaumincomode"
          },
          {
            id: 2,
            username: "O Clone",
            password: "x",
            email: "x@x",
            profilePic:
              "https://cdn.discordapp.com/attachments/499615761720147978/671159178345054218/unknown.png",
            address: "Jardim Paulo Vallada 4000-001 Porto",
            approval: true,
            available: true,
            postalCode: "4000-001",
            local: "Porto",
            info: "a sequela",
            album: [],
            comments: [
              {
                id: 0,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 1,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 2,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 3,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              }
            ],
            tags: [],
            menu: [],
            tables: [],
            phone: "91199porfavornaumincomode"
          },
          {
            id: 3,
            username: "Restaurante Carinho para Sustento",
            password: "cuddlemeplease",
            email: "abraços@x",
            profilePic:
              "https://cdn.discordapp.com/attachments/499615761720147978/672478045864460337/adlib-home-2.png",
            address: "Rua Abraços Ímpares de 49 a 165 4000-001 Porto",
            approval: false,
            available: true,
            postalCode: "4000-001",
            local: "Porto",
            info:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus euismod facilisis. Ut venenatis nulla finibus dolor rhoncus vulputate. Sed maximus commodo dolor vitae vehicula. Morbi scelerisque elit egestas libero condimentum, non hendrerit ex ultricies. Pellentesque vitae convallis magna, in facilisis metus. Mauris fringilla congue pharetra. Sed auctor eget orci a imperdiet. Phasellus ac interdum est. Donec velit dolor, iaculis ac dictum quis, vehicula sit amet arcu. In hac habitasse platea dictumst. Etiam laoreet nunc eleifend accumsan venenatis. Praesent a felis luctus, hendrerit diam ut, scelerisque risus. Vivamus volutpat vestibulum turpis quis luctus. Aliquam vel nisi condimentum, consectetur felis nec, tristique leo. Ut id ex elementum, pharetra libero ac, gravida nunc.Aenean magna felis, sollicitudin vel congue at, iaculis ut sapien. Praesent commodo arcu eu leo maximus, quis laoreet nunc lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tempor ut nisi in condimentum. Duis imperdiet, augue vitae porta pellentesque, diam urna maximus lacus, vitae blandit nunc massa et nisl. Ut laoreet finibus rhoncus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer et libero quis libero rhoncus consequat. Duis condimentum iaculis magna, eget mollis nulla auctor vel. Nam dapibus, massa nec aliquet ultrices, elit tellus sollicitudin sapien, non tempor mauris enim viverra risus. Integer purus metus, porttitor eu ex eu, blandit vestibulum velit.Proin posuere maximus suscipit. Morbi porta nisl ac magna lacinia porttitor. Etiam gravida ex erat, et malesuada purus placerat eget. Nunc sit amet nisi ac neque molestie aliquam. Morbi eleifend arcu risus, nec sollicitudin nunc finibus sed. Morbi eget ultrices ex. Quisque finibus nulla ac elit bibendum, ac commodo ante interdum. Quisque malesuada eleifend nisl, sed varius dolor bibendum at. Vestibulum rutrum, dui vel pulvinar varius, orci libero volutpat enim, sed rhoncus dolor sem et risus. Proin vehicula eleifend purus nec viverra. Nullam eros justo, suscipit ut tincidunt nec, pellentesque eu mi. Curabitur venenatis mauris libero, sit amet tempor libero porttitor id. Donec malesuada nec erat a eleifend. Nunc sed rutrum arcu. Quisque accumsan fermentum rutrum. Donec vel ullamcorper elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris vestibulum condimentum lorem, ut rhoncus ante posuere ac. Morbi non velit elementum, feugiat quam eget, lacinia libero. Nulla facilisi. Nullam at nibh dapibus, sollicitudin quam vel, viverra tellus. Nullam molestie leo dignissim, porttitor sem ac, accumsan sem. In posuere ullamcorper est eu pretium. Etiam consectetur metus erat, et fermentum nibh porttitor mollis. Nulla maximus pretium tortor, et gravida quam congue quis. Suspendisse vel massa vitae lorem hendrerit pulvinar. Mauris mauris magna, dignissim non enim at, dapibus volutpat lorem. Vivamus pretium purus eu ipsum sodales, a dapibus orci faucibus. Praesent ut neque vestibulum, blandit metus in, commodo mi. In sit amet lacus interdum, fringilla enim at, tempus lectus. Maecenas sed enim tincidunt, laoreet urna ut, pulvinar risus. Morbi laoreet tortor arcu, a convallis risus gravida tempus. In scelerisque eros ac posuere condimentum. Cras quis augue est. In hac habitasse platea dictumst. Praesent blandit porttitor varius. Donec vehicula est sed dui cursus, eget facilisis sapien vestibulum.",
            album: [
              {
                id: 0,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672475355499593758/2Q.png"
              },
              {
                id: 1,
                url:
                  "https://cdn.discordapp.com/attachments/499615761720147978/672475555668688936/casule-psicologia-juiz-de-fora-abraC3A7o.png"
              },
              { id: 2, url: "https://i.imgur.com/tfEis8D.jpg" },
              { id: 3, url: "https://i.imgur.com/MuH4mfH.jpg" },
              { id: 4, url: "https://i.imgur.com/s6dX9yF.jpg" }
            ],
            comments: [
              {
                id: 0,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 1,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 2,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              },
              {
                id: 3,
                username: "ZéBitzz",
                profilePic:
                  "https://avatars2.githubusercontent.com/u/44086730?s=400&v=4",
                rate: 2,
                text: "O site feio e eu aqui",
                userId: 43
              }
            ],
            tags: [],
            menu: [],
            tables: [],
            phone: "91199porfavornaumincomode"
          }
        ];

        localStorage.setItem("restaurants", JSON.stringify(state.restaurants));
      } else {
        state.restaurants = JSON.parse(localStorage.getItem("restaurants"));
      }
    }
  },

  //idk what i'm doing, life is ultimately meaningless anyway...
  actions: {
    async registerRestaurant({ commit }) {
      commit(
        "SET_STATUS",
        await usersService.registerRestaurant({
          nome: this.state.request.username,
          password: this.state.request.password,
          morada: this.state.request.address,
          cod_postal: this.state.request.postalCode,
          localidade: this.state.request.local,
          email: this.state.request.email
        })
      );
    },

    async getRestaurant({ commit }) {
      commit(
        "SET_STATUS",
        await usersService.getRestaurant({
          email: this.state.request.email,
          password: this.state.request.password
        })
      );
    }
  },
  modules: {}
});
