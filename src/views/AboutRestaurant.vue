<template>
  <div class="container">
    <div class="row">
      <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
        <h5 class="pt-2 font-weight-bold"></h5>
        <img id="fotoRestaurante" :src="restaurant.profilePic" class="pb-2 img-fluid" />
      </div>
      <div class="col-sm-1"></div>
      <div id="windowCarrousel" class="col-sm-6 text-center img-thumbnail img-fluid">
        <h5 class="font-weight-bold">Fotos do restaurante</h5>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="4000">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100 img-fluid" src="../assets/banana.jpg" alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 img-fluid" src="../assets/circunvalacao-9.jpg" alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 img-fluid" src="../assets/banana.jpg" alt="Third slide" />
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
    </div>
    <div class="row ">
      <div id="windowReservation" class="col-sm-6 img-thumbnail">
        <div class="row">
          <div class="col-sm-5">
            <h5>Hora:</h5>
            <input v-model="hour" required type="time" />
            <br />
            <br />
            <input @input="checkAvailability" required v-model="date" type="date" id="start" name="start" />
            <br />
            <br />
            <button @click="reservation" v-if="this.$store.state.logged == true && this.$store.state.loggedUser.type == 'client'" id="smallerButton">Reservar</button>
            <h5 v-if="this.$store.state.logged == false">Precisa de estar ligado para fazer reservas</h5>
            <h5 v-if="this.$store.state.loggedUser.type == 'restaurant'">Contas restaurantes não podem fazer reservas. Por favor crie uma conta cliente para si.</h5>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-5">
            <h5>Mesas:</h5>
            <div class="form-group">
              <select v-if="availableTables.length && restaurant.available" multiple class="form-control" id="sltTables">
                <option  v-for="table in availableTables" v-bind:key="table.id"> Mesa {{table.id + 1}} | {{table.capacity}} pessoas</option> 
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
    <br/>

    <div id="finalCrate" class="row d-flex" style="border:1px solid black;">
      <div @click="call('menu')" class="col-sm-3 pt-3" style="border-bottom:1px solid black;">
        <h5 class="font-weight-bold">Ementa</h5>
      </div>
      <div @click="call('promos')" class="col-sm-3 pt-3" style="border-bottom:1px solid black; border-left:1px solid black;">
        <h5 class="font-weight-bold">Promoções</h5>
      </div>
      <div @click="call('comments')" id="comments" class="col-sm-3 pt-3 font-weight-bold "
        style="border-bottom:1px solid black; border-left:1px solid black;">
        <h5 class="font-weight-bold">Comentários</h5>
      </div>
      <div class="col-sm-1" style="border-left:1px solid black;"></div>
      <div @click="call('info')" id="information" class="col-sm-2 pt-2 " style="border-bottom:1px solid black; border-left:1px solid black;">
        <h1 class="font-weight-bold">i</h1>
      </div>
      <div v-show="component=='info'">
        <h5>{{restaurant.info}}</h5>
      </div>
      <div v-show="component=='comments'">
        <Comments v-for="comment in restaurant.comments"
                v-bind:comment="comment"
                v-bind:key="comment.username"></Comments>
      </div>
      <div v-show="component=='promos'">
        <h5>promos</h5>
      </div>
      <div v-show="component=='menu'">
        <h5>ementa</h5>
      </div>
      
    </div>
  </div>
</template>

<script>
import Comments from "@/components/Comments.vue"
export default {
  data: () => ({
    component: "comments",
    restaurant: {},
    hour: "",
    date: "",
    availableTables: [],
    num_people: [2], //mesas selecionadas sltTables
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
    checkAvailability() {
      this.availableTables = this.$store.getters.getAvailableTables(this.date, this.restaurant.id, this.restaurant.tables)
      let limit = 0
      let num_pp = 0
      for (let index = 0; index < this.num_people.length; index++) {
         num_pp+= this.num_people[index]
      }

      for (let j = 0; j < this.availableTables.length; j++) {
        if (this.availableTables[j].capacity.typeof == "Number") {
          limit += this.availableTables[j].capacity
        }
      }

      
      
      if (num_pp > limit) {
        return false
      } else {
        return true
      }

    },
    reservation() {
      //fazer check se está logged in ou fazer v-if para n haver opção de reserva caso n esteja autenticado ou seja um restaurante
      if (this.checkAvailability(this.date)) {
        this.$store.commit("ADD_RESERVATION", {
          id_restaurant: this.restaurant.id,
          id_client: JSON.parse(localStorage.getItem("loggedUser")).id,
          hour: this.hour,
          date: this.date,
          dateOfRes: this.getSystemDate(), //buscar data atual
          num_people: this.num_people,
          presence: false,
          confirmation: "pending"
        })
        alert("Pedido enviado")
      } else {
        //show "no no" message
        alert("Capacidade Excedida")
        alert("no no")
      }
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
    getSystemDate(){
      let today = new Date()
      return `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}`
    }
  },

  components: {
    Comments
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
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  border: none;
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
