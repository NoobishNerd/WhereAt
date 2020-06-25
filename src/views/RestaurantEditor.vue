<template>
<div class="container">
  <div class="row">
    <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
      <h5 class="pt-2 ">{{restaurant.nome}}</h5>
      <img @click="replaceRouteProfile" id="fotoRestaurante" :src="restaurant.foto_perfil" class="pb-3 img-fluid"
        style="object-fit: cover" />
    </div>
    <div class="col-sm-1"></div>


<div v-if="album.length != 0" id="windowCarrousel" class="text-center img-fluid">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="4000">
            <ol class="carousel-indicators">
              <li v-for="photo in album" v-bind:key="photo.id_foto" data-target="#carouselExampleIndicators"
                :data-slide-to="photo.id_foto" :class="{ active: photo.id_foto == album[0].id_foto }"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item" v-for="photo in album" v-bind:key="photo.id_foto + photo.link_foto"
                :class="{ active: photo.id_foto == album[0].id_foto }">
                <button @click="removePhoto(photo.id_foto)" id="removePhotoBtn" class="px-5 mb-2 mt-2">Remover foto</button>
                <img :src="photo.link_foto" class="d-block img-fluid" :alt="'slide ' + photo.id_foto" />
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
      <h5>Nenhuma foto foi carregada</h5>
    </div>


  </div>
  <div class="row">
    <div class="col-sm-5 px-2">
      <button @click="replaceRouteProfile()" id="manageBtn" type="button" class="btn btn-block py-3">Gerir
        Reservas</button>
    </div>
    <div class="col-sm-1">
    </div>
    <div class="col-sm-6">
      <button @click="addPhoto()" id="addPhotoBtn" type="button" class="btn btn-block py-3">Adicionar Foto</button>
    </div>
  </div>
  <div class="row ">
    <div id="windowEditor" class="col-sm-6 img-thumbnail">
      <TableEditor :restaurantId="this.$route.params.id"></TableEditor>
    </div>
    <div class="col-sm-6 ">
      <div>
        <div class="google-map img-fluid" id="myMap"></div>
      </div>
    </div>
  </div>
  <div id="finalCrate" class="row d-flex">
    <div @click="call('menu', 'menu')" id="menu" class="col-sm-2 pt-3 mr-3 ml-3 mt-3"
      style="border-bottom-lg light:1px; cursor:pointer">
      <h5 class="" id="menuText" style="color:#f17526">Ementa</h5>
    </div>
    <div @click="call('album', 'album')" id="album" class="col-sm-2 pt-3 mr-3 ml-3 mt-3">
      <h5 class="" id="albumText" style="color:#f17526">Categorias</h5>
    </div>
    <div @click="call('comments', 'comentary')" id="comentary" class="col-sm-2 pt-3 ml-3 mt-3 "
      style="border-bottom-lg light:1px; border-left-lg light:1px; cursor:pointer">
      <h5 class="" id="comentaryText" style="color:#f17526">Comentários</h5>
    </div>
    <div class="col-sm-3" style="border-left-lg light:1px"></div>
    <div @click="call('info', 'information')" id="information" class="col-sm-2 mt-3 pt-1 "
      style="border-bottom-lg light:1px; border-left-lg light:3px; cursor:pointer">
      <h1 class="text-center " id="informationText" style="color:white">i</h1>
    </div>
    <Comments v-show="component == 'comments'" v-bind:restaurant="restaurant" v-bind:comments="comments">
    </Comments>
    <TagEditor :restaurantId="this.$route.params.id" v-show="component == 'album'"></TagEditor>
    <MenuEditor :restaurantId="this.$route.params.id" v-show="component == 'menu'"></MenuEditor>
    <InfoEditor :restaurant="restaurant" v-show="component == 'info'"></InfoEditor>
  </div>
</div>
</template>
<script>
import TableEditor from "../components/TableEditor.vue";
import Comments from "@/components/Comments.vue"
import TagEditor from "@/components/TagEditor.vue"
import MenuEditor from "@/components/MenuEditor.vue"
import InfoEditor from "@/components/InfoEditor.vue"

import usersService from '../api/users.js';
import restaurantService from '../api/restaurants.js';

export default {
  data: () => ({
    component: "info",
    map: "",
    restaurant: {},
    lastCallId: "information",
    album: [],
    comments: []

  }),
  mounted: async function () {
    this.restaurant = await usersService.getRestaurantById(this.$route.params.id);
    this.renderMap();
  },

  created: async function () {
    this.comments = await restaurantService.getRestaurantComments(this.$route.params.id);
    this.album = await restaurantService.getRestaurantAlbum(this.$route.params.id);
  },

  methods: {
    call(newComponent, id) {
      document.getElementById(this.lastCallId).style = "background-color:white";
      document.getElementById(this.lastCallId + "Text").style = "color:#f17526";

      document.getElementById(id).style = "background-color:#f17526";
      document.getElementById(id + "Text").style = "color:white";
      this.lastCallId = id;
      this.component = newComponent;
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
      this.geocodeAddress(geocoder, this.map)
    },

    geocodeAddress(geocoder, resultsMap){
      const address = this.restaurant.morada + ", " + this.restaurant.cod_postal + " " + this.restaurant.localidade;
      geocoder.geocode({ 'address': address},
      (results, status) => {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
          resultsMap.setMapTypeId("roadmap")
        } else {
          alert("Geocode didn't work because of: " + status)
        }
      });
    },

    replaceRouteProfile() {
      this.$router.replace({
        name: "restaurantProfile",
        params: {
          id: this.restaurant.id_restaurante
        }
      });
    },


    async addPhoto() {
      let newPhoto = prompt("Link da imagem:")
      if (newPhoto != "") {
        await restaurantService.addPhoto({link_foto: newPhoto} ,this.$route.params.id)
      } else {
        alert("Coloque o link da imagem!");
      }
      this.album = await restaurantService.getRestaurantAlbum(this.$route.params.id);
    },


    async removePhoto(id) {
      await restaurantService.deletePhoto(id);
      this.album = await restaurantService.getRestaurantAlbum(this.$route.params.id);
    } 
  },

  components: {
    TableEditor,
    Comments,
    TagEditor,
    MenuEditor,
    InfoEditor
  }
};
</script>

<style scoped>
img {
  height: 300px;
  width: 562px;
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
  height: 300px;
}

#windowPhoto {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
    height:auto;
    object-fit: cover;
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

#album{
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:white;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #f17526;
  cursor:pointer
}

#menu {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:white;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #f17526;
  cursor:pointer
}

#comentary {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:white;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #f17526;
  cursor:pointer
}

#information {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #f17526;
  cursor:pointer
}

#windowEditor {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
}

#myMap {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
}

#manageBtn {
  background-color: white;
  border-color: #f17526;
  border-radius: 5px;
  color: #f17526;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
}


#manageBtn:hover{
  color: white;
  background-color: #f17526;
}


#addPhotoBtn {
  background-color: white;
  border-color: #f17526;
  border-radius: 5px;
  color: #f17526;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
}

#addPhotoBtn:hover{
  color: white;
  background-color: #f17526;
}


#removePhotoBtn {
  background-color: #f17526;
  border: none;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
template{
  background-image: url("../assets/backgroundTempDark.png");
}
</style>
