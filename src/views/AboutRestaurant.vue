<template>
  <div class="container">
    <div class="row">
      <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
        <h5 class="pt-2 font-weight-bold"></h5>
        <img id="fotoRestaurante" :src="restaurant.profilePic" class="pb-3 img-fluid" style="height: 17vw; object-fit: cover"/>
      </div>
      <div class="col-sm-1"></div>
      <div v-if="restaurant.album.length != 0" id="windowCarrousel"
        class="col-sm-6 text-center img-thumbnail img-fluid">
        <h5 class="font-weight-bold pt-1">Fotos do restaurante</h5>

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="4000">
          <ol class="carousel-indicators">
              <li v-for="photo in restaurant.album" v-bind:key="photo.id" data-target="#carouselExampleIndicators" :data-slide-to="photo.id" :class="{ active: photo.id==0 }"></li>
          </ol>
          <div class="carousel-inner">

            <div class="carousel-item" v-for="photo in restaurant.album" v-bind:key="photo.id + photo.url"
              :class="{ active: photo.id==0 }">
              <img :src="photo.url" class="d-block w-100 img-fluid" :alt="'slide ' + photo.id">
            </div>

          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

      </div>
      <div v-else>
        <h5>O restaurante ainda não adicionou fotos</h5>
      </div>
    </div>
    <div class="row ">
      <div id="windowReservation" class="col-sm-6 img-thumbnail">
        <div class="row">
          <div class="col-sm-5">
            <form v-on:submit.prevent="reservation()">
              <h5>Hora:</h5>
              <input  v-model="hour" required type="time" />
              <input  required v-model="date" type="date" id="start" name="start" />
              <input @click="updateAvailableTables" type="button" value="Ver mesas disponiveis">
              <br />
              <br />
              <button type="submit"
                v-if="this.$store.state.logged == true && this.$store.state.loggedUser.type == 'client'"
                id="smallerButton">Reservar</button>
              <h5 v-if="this.$store.state.logged == false">Precisa de estar ligado para fazer reservas</h5>
              <h5 v-if="this.$store.state.loggedUser.type == 'restaurant'">Contas restaurantes não podem fazer reservas.
                Por favor crie uma conta cliente para si.</h5>
            </form>
          </div>

          <div class="col-sm-7">
            <h5>Mesas:</h5>
            <div class="form-group">
              <select size="6" v-if="availableTables.length && restaurant.available" class="form-control" id="sltTables"
                v-model="selectedTable">

                <option v-for="table in availableTables" v-bind:key="table.id"> <p v-if="table.capacity != 0">
                  Mesa {{table.id + 1}} | {{table.capacity}} pessoas </p> <p v-if="table.capacity == 0">
                  Mesa {{table.id + 1}} | [X] Ocupada </p></option>
              </select>
              <div v-else>
                <h5>De momento o restaurante não está disponivel para reservas... :(</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-1"></div>
      <div class="col-sm-5 ">
        <div>
          <div class="google-map img-fluid" id="myMap"></div>
        </div>
      </div>
    </div>
    <br />

    <div id="finalCrate" class="row d-flex">
      <div @click="call('menu')" id="menu" class="col-sm-3 pt-3" style="border-bottom-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold">Ementa</h5>
      </div>
      <div @click="call('promos')" id="promotion" class="col-sm-3 pt-3"
        style="border-bottom-lg light:1px solid black; border-left-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold">Promoções</h5>
      </div>
      <div @click="call('comments')" id="comentary" class="col-sm-3 pt-3 font-weight-bold "
        style="border-bottom-lg light:1px; border-left-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold">Comentários</h5>
      </div>
      <div class="col-sm-1" style="border-left-lg light:1px"></div>
      <div @click="call('info')" id="information" class="col-sm-2 pt-2 "
        style="border-bottom-lg light:1px; border-left-lg light:3px; cursor:pointer">
        <h1 class="text-center font-weight-bold">i</h1>
      </div>
      <AddComment :restaurant="restaurant" v-show="component == 'comments'"> </AddComment>
      <Comments v-show="component == 'comments'" v-for="comment in restaurant.comments" v-bind:comment="comment"
        v-bind:key="comment.username"></Comments>
      <PromotionEditor v-show="component == 'promos'"></PromotionEditor>
      <DisplayMenu :restaurant="restaurant" v-show="component == 'menu'"></DisplayMenu>
      <DisplayInfo :restaurant="restaurant" v-show="component == 'info'"></DisplayInfo>
    </div>
  </div>
</template>
<script>
import Comments from "@/components/Comments.vue"
import PromotionEditor from "@/components/PromotionEditor.vue"
import DisplayMenu from "@/components/DisplayMenu.vue"
import DisplayInfo from "@/components/DisplayInfo.vue"
import AddComment from "@/components/AddComment.vue"


export default {
  data: () => ({
      component: "comments",
      restaurant: {},
      hour: "",
      date: "",
      availableTables: [],
      selectedTableReady: [],
      selectedTable: "",
      map: "",
    }),
    mounted: function () {
      this.renderMap();
    },

    created: function () {
      this.restaurant = this.$store.getters.getRestaurantById(this.$route.params.id);
      this.availableTables = this.restaurant.tables
    },

    methods: {
      call(newComponent) {
        this.component = newComponent;
      },

      getSystemDate() {
        let today = new Date()
        return `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}`
      },

      renderMap() {
        this.map = new google.maps.Map(document.querySelector("#myMap"), {
          center: {
            lat: -34.397,
            lng: 150.644
          },
          zoom: 8
        });
        this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      },


      reservation() {
        //fazer check se está logged in ou fazer v-if para n haver opção de reserva caso n esteja autenticado ou seja um restaurante
        if (this.checkAvailability() && this.selectedTable != "") {
          this.$store.commit("ADD_RESERVATION", {
            id_restaurant: this.restaurant.id,
            id_client: JSON.parse(localStorage.getItem("loggedUser")).id,
            hour: this.hour,
            date: this.date,
            dateOfRes: this.getSystemDate(), //buscar data atual
            sltdTable: this.selectedTableReady,
            presence: false,
            confirmation: "p"
          })
          this.updateAvailableTables();
        } else if (this.selectedTable == "") {
          alert("Por favor selecione uma mesa")
        }

      },

      updateAvailableTables() {
       
        this.availableTables = this.$store.getters.getAvailableTables(this.date, this.restaurant.id, this.restaurant.tables)
  
        alert(JSON.stringify(this.availableTables))
      },

      checkAvailability() {
        this.updateAvailableTables();
        this.updateObjectTable();
        if (this.selectedTableReady.capacity == 0) {
          alert("A mesa selecionada não está disponivel")
          return false
        } else {
          return true
        }
      },



      updateObjectTable() {

        let start = this.selectedTable.indexOf(" ") + 1
        let end = this.selectedTable.indexOf("|") - 1
        let selectedId = parseInt(this.selectedTable.slice(start, end)) - 1

        for (const table of this.availableTables) {
          if (table.id == selectedId) {
            this.selectedTableReady = {
              id: selectedId,
              capacity: table.capacity
            }
          }
        }



      }
    },

    components: {
      Comments,
      PromotionEditor,
      DisplayMenu,
      DisplayInfo,
      AddComment
    }
  };
</script>

<style scoped>
img {
  height: 300px;
  width: auto;
}
.row {
  margin-top: 50px;
}

html * {
  color: #f17526;
}
#smallerButton {
  background-color: #f17526;
  border: none;
  color: #ffffff;
  padding: 10px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 10px 20px 40px 20px;
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
#windowPhoto {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
}
#windowCarrousel {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
}

#windowReservation {
  border-color: white;
  box-shadow: 0 30px 60px 15px rgba(0, 0, 0, 0.1);
}
#finalCrate {
  border-radius: 10px 10px 0px 0px;
}
.border-primary {
  border-width: 3px;
}
#promotion {
  -webkit-box-shadow: 1px 3px 0px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
}
#menu {
  -webkit-box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
}
#comentary {
  -webkit-box-shadow: 1px 3px 0px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.25);
}
#information {
  -webkit-box-shadow: -1px 3px 0px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px 2px 0px 0px rgba(0, 0, 0, 0.25);
  box-shadow: -1px 2px 0px 0px rgba(0, 0, 0, 0.25);
}
#windowEditor {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
}
#myMap {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
}
</style>
