<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-7">
        <div
          v-if="album.length != 0"
          id="windowCarrousel"
          class="text-center img-fluid"
        >
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
            data-interval="4000"
          >
            <ol class="carousel-indicators">
              <li
                v-for="photo in album"
                v-bind:key="photo.id_photo"
                data-target="#carouselExampleIndicators"
                :data-slide-to="photo.id_photo"
                :class="{ active: photo.id_photo == album[0].id_photo }"
              ></li>
            </ol>
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="photo in album"
                v-bind:key="photo.id_photo + photo.srcLink"
                :class="{ active: photo.id_photo == album[0].id_photo }"
              >
                <img
                  :src="photo.srcLink"
                  class="d-block w-100 img-fluid"
                  :alt="'slide ' + photo.id_photo"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
                style="color:orange"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div v-else>
          <h5>O restaurante ainda não adicionou fotos</h5>
        </div>
      </div>
      <div class="col-5">
        <h5 class="" style="color:#f17526" id="restaurantNameH5">{{ restaurant.name }}</h5>
        <h6 class="" v-if="restaurant.info == ''">
          Este restaurante ainda não adicionou informações adicionais
        </h6>
        <p v-else class="" id="restaurantInfoP">
          {{ restaurant.info }}
        </p>
        <div class="row">
          <div class="col-12">
            <div class="google-map img-fluid" id="myMap"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="finalCrate" class="row d-flex">
      <ul class="tabs">
        <li
          :class="{ active: selected == 'info' }"
          @click="(selected = 'info'), call('info', 'information')"
        >
          Informação
        </li>
        <li
          :class="{ active: selected == 'menu' }"
          @click="(selected = 'menu'), call('menu', 'menu')"
        >
          Ementa
        </li>
        <li
          :class="{ active: selected == 'promos' }"
          @click="(selected = 'promos'), call('promos', 'promotion')"
        >
          Categorias
        </li>
        <li
          :class="{ active: selected == 'comments' }"
          @click="(selected = 'comments'), call('comments', 'comentary')"
        >
          Comentários
        </li>
      </ul>
      <div class="separator"></div>
      <Comments
        v-show="component == 'comments'"
        v-bind:restaurant="restaurant"
        v-bind:comments="comments"
      ></Comments>
      <DisplayTags
        :restaurantId="Number(this.$route.params.id)"
        v-show="component == 'promos'"
      ></DisplayTags>
      <DisplayMenu
        :restaurantId="Number(this.$route.params.id)"
        v-show="component == 'menu'"
      ></DisplayMenu>
      <DisplayInfo
        :restaurant="restaurant"
        v-show="component == 'info'"
      ></DisplayInfo>
    </div>
    <div class="row" id>
      <div id="windowReservation" class="col-sm-12 pt-0">
        <div class="row">
          <div class="col-sm-8 pb-4">
            <h4 style="color:#f17526">Mesas:</h4>
            <div class="form-group">
              <select
                size="17"
                v-if="availableTables.length && restaurant.availability"
                class="form-control"
                id="sltTables"
                v-model="selectedTable"
              >
                <option
                  v-for="table in availableTables"
                  v-bind:key="table.id_table"
                >
                  <p v-if="table.capacity != 0">
                    Mesa {{ table.id_table }} | {{ table.capacity }} pessoas
                  </p>
                  <p v-if="table.capacity == 0">
                    Mesa {{ table.id_table }} | [X] Ocupada
                  </p>
                </option>
              </select>
              <div v-else>
                <h5>
                  De momento o restaurante não está disponivel para reservas...
                </h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4 pt-0">
            <form v-on:submit.prevent="reservation()">
              <h4 style="color:#f17526">Hora:</h4>
              <input class=" mb-3" v-model="hour" required type="time" />
              <br />
              <input
                class="mb-3"
                required
                v-model="date"
                type="date"
                id="start"
                name="start"
              />
              <button
                type="submit"
                class="py-2 px-5 pl-0 ml-0 mt-5"
                v-if="
                  this.$store.state.logged == true &&
                    this.$store.state.loggedUser.type == 'client'
                "
                id="smallerButton"
              >
                Reservar
              </button>
              <h5 v-if="this.$store.state.logged == false">
                Precisa de estar logado para fazer reservas
              </h5>
              <h5 v-if="this.$store.state.loggedUser.type == 'restaurant'">
                Contas restaurantes não podem fazer reservas. Por favor crie uma
                conta cliente para si.
              </h5>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import Comments from "@/components/Comments.vue";
import DisplayTags from "@/components/DisplayTags.vue";
import DisplayMenu from "@/components/DisplayMenu.vue";
import DisplayInfo from "@/components/DisplayInfo.vue";

import usersService from "../api/users.js";
import restaurantService from "../api/restaurants.js";
import bookingService from "../api/booking.js";
import swal from "sweetalert2";

export default {
  data: () => ({
    component: "info",
    map: "",
    restaurant: {},
    comments: [],
    album: [],
    hour: "",
    date: "",
    availableTables: [],
    selectedTableReady: [],
    selectedTable: "",
    lastCallId: "information",
    selected: "info"
  }),

  mounted: async function() {
    this.restaurant = await usersService.getRestaurantById(
      this.$route.params.id
    );
    this.renderMap();
  },

  created: async function() {
    this.comments = await restaurantService.getRestaurantComments(
      this.$route.params.id
    );
    this.availableTables = await restaurantService.getRestaurantTables(
      this.$route.params.id
    );
    this.album = await restaurantService.getRestaurantAlbum(
      this.$route.params.id
    );
  },

  methods: {
    async call(newComponent, id) {
      this.lastCallId = id;
      this.component = newComponent;
      switch (newComponent) {
        case "coments":
          this.comments = await restaurantService.getRestaurantComments(
            this.$route.params.id
          );
          break;
        case "promos":
          break;
        case "info":
          break;
        case "menu":
          break;
      }
    },

    getSystemDate() {
      let today = new Date();
      return `${today.getDate()}/${today.getMonth() +
        1}/${today.getFullYear()}-${today.getHours()}:${today.getMinutes()}`;
    },
    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 17,
        mapTypeId: "roadmap"
      });
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.map);
    },

    geocodeAddress(geocoder, resultsMap) {
      const address =
        this.restaurant.address +
        ", " +
        this.restaurant.postalCode +
        " " +
        this.restaurant.local;
      geocoder.geocode(
        {
          address: address
        },
        (results, status) => {
          if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            resultsMap.setMapTypeId("roadmap");
          } else {
            swal.fire(
              "Geocode",
              "Geocode didn't work because of: " + status,
              "warning"
            );
          }
        }
      );
    },

    async reservation() {
      //fazer check se está logged in ou fazer v-if para n haver opção de reserva caso n esteja autenticado ou seja um restaurante
      if (this.checkAvailability() && this.selectedTable != "") {
        this.updateAvailableTables();
        let response = await bookingService.createReservation({
          date_booked: this.date + "-" + this.hour,
          id_user: this.$store.getters.getLoggedUser.id,
          id_restaurant: this.$route.params.id,
          id_table: this.selectedTableReady.id_table,
          date: this.getSystemDate()
        });
        if (response.code == "ER_DUP_ENTRY") {
          swal.fire("Reserva", "Já efetuou um pedido igual!", "error");
        } else if (
          response !=
          "Error! This table is unavailable you should not be able to book it."
        ) {
          swal.fire("Reserva", "Pedido de reserva enviado!", "success");
        } else {
          swal.fire(
            "Reserva",
            "Mesa ocupada! Selecione outra mesa/hora",
            "error"
          );
        }
      } else if (this.selectedTable == "") {
        swal.fire("Reserva", "Por favor selecione uma mesa!", "info");
      }
    },

    async checkAvailability() {
      this.updateAvailableTables();

      this.updateObjectTable();

      if (this.selectedTableReady.capacity == 0) {
        swal.fire("Reserva", "A mesa selecionada não está disponivel!", "info");
        return false;
      } else {
        return true;
      }
    },

    async updateAvailableTables() {
      //reset
      this.availableTables = await restaurantService.getRestaurantTables(
        this.$route.params.id
      );
      //obter mesas ocupadas para data escolhida
      let busyTablesId = await bookingService.getNonAvailabeTablesIds(
        {
          date_booked: this.date + "-" + this.hour
        },
        this.$route.params.id
      );
      //capacidade das ocupadas passa a 0
      for (const table in this.availableTables) {
        for (let i = 0; i < busyTablesId.length; i++) {
          if (table.id == busyTablesId[i]) {
            table.capacity = 0;
          }
        }
      }
    },

    async updateObjectTable() {
      //traduzir a mesa de string para objeto
      let start = this.selectedTable.indexOf(" ") + 1;
      let end = this.selectedTable.indexOf("|") - 1;
      let selectedId = parseInt(this.selectedTable.slice(start, end));
      for (const table of this.availableTables) {
        if (table.id_table == selectedId) {
          this.selectedTableReady = {
            id_table: selectedId,
            id_restaurant: this.$route.params.id,
            capacity: table.capacity
          };
        }
      }
    }
  },

  components: {
    Comments,
    DisplayTags,
    DisplayMenu,
    DisplayInfo
  }
};
</script>

<style scoped>
p {
  font-size: 12px;
}

img {
  height: 300px;
  width: auto;
}

#smallerButton {
  background-color: #302f30;
  border: none;
  color: #ffffff;
  padding: 10px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 10px 20px 40px 20px;
  -webkit-border-radius: 2px 2px 2px 2px;
  border-radius: 2px 2px 2px 2px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#fotoRestaurante {
  width: 400px;
  border-color: white;
  height: 300px;
}

#finalCrate {
  border: none;
  margin-left: 0px;
  margin-top: 15px;
}
.border-primary {
  border-width: 3px;
}
#promotion {
  background-color: white;
  border: 1px solid #f17526;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}
#menu {
  background-color: white;
  border: 1px solid #f17526;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}
#comentary {
  background-color: white;
  border: 1px solid #f17526;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}
#information {
  background-color: #f17526;
  border: 1px solid #f17526;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  padding-bottom: 5px;
}
#windowEditor {
}
#myMap {
}
#inputBtn {
  width: 100px;
}
.google-map {
  width: 100%;
  height: 235px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.tabs li {
  border: 1px #f17526 solid;
  border-bottom: none;
  /* border-top-left-radius: 4px;
  border-top-right-radius: 4px; */
  cursor: pointer;
  margin-right: 2.5px;
  padding: 5px;
}

/* .tabs li:first-child {
  margin-left: 2.5px;
} */

.tabs li.active {
  background-color: #f17526;
  color: white;
}

.separator {
  background-color: #f17526;
  height: 1px;
  width: 100%;
}

#windowReservation {
  margin-top: 60px;
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffa500' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffa500' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
}
</style>
