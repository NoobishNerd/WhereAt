<template>
  <div class="container">
    <div class="row">
      <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
        <h5 class="pt-2 font-weight-bold"></h5>
        <router-link to="restaurantProfile">
          <img id="fotoRestaurante" src="../assets/circunvalacao-9.jpg" class="pb-2 img-fluid" />
        </router-link>
      </div>
      <div class="col-sm-1"></div>
      <div id="windowCarrousel" class="col-sm-6 text-center img-thumbnail img-fluid  ">
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
      <div id="windowEditor" class="col-sm-6 img-thumbnail">
        <TableEditor></TableEditor>
      </div>
      <div class="col-sm-6 ">
        <div>
          <div class="google-map img-fluid" id="myMap"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div id="finalCrate" class="row d-flex">
        <div id="menu" class="col-sm-3 pt-3" style="border-bottom-lg light:1px">
          <h5 class="font-weight-bold">Ementa</h5>
        </div>
        <div id="promotion" class="col-sm-3 pt-3"
          style="border-bottom-lg light:1px solid black; border-left-lg light:1px">
          <h5 class="font-weight-bold">Promoções</h5>
        </div>
        <div id="comentary" class="col-sm-3 pt-3 font-weight-bold "
          style="border-bottom-lg light:1px; border-left-lg light:1px;">
          <h5 class="font-weight-bold">Comentários</h5>
        </div>
        <div class="col-sm-1" style="border-left-lg light:1px"></div>
        <div id="information" class="col-sm-2 pt-2 " style="border-bottom-lg light:1px; border-left-lg light:3px;">
          <h1 class="font-weight-bold">i</h1>
        </div>
        <p class="text-justify pt-2 ml-3 mr-3">
          {{restaurant.info}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import TableEditor from "../components/TableEditor.vue";
export default {
  data: () => ({
    component: "info",
    map: "",
    restaurant: ""
  }),
  mounted: function() {
    this.renderMap();
  },

  created: function(){
    this.restaurant = this.$store.getters.getRestaurantById(this.$route.params.id)
  },

  methods: {
    call(newComponent) {
      this.component = newComponent;
    },
    renderMap() {
      this.map = new google.maps.Map(document.querySelector("#myMap"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    }
  },

  components: {
    TableEditor
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
.google-map {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
#finalCrate {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  border: none;
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
