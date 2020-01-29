<template>

  <div class="container">
    <div class="row">
      <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
        <h5 class="pt-2 font-weight-bold"></h5>
        <img @click="replaceRouteProfile" id="fotoRestaurante" :src="restaurant.profilePic" class="pb-3 img-fluid" style="height: 17vw; object-fit: cover"/>
      </div>
      <div class="col-sm-1"></div>
      <div v-if="restaurant.album.length != 0" id="windowCarrousel"
        class="col-sm-6 text-center img-thumbnail img-fluid">
        <h5 class="font-weight-bold pt-1 mb-0">Fotos do restaurante</h5>

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="4000">
          <ol class="carousel-indicators">
            <li v-for="photo in restaurant.album" v-bind:key="photo.id" data-target="#carouselExampleIndicators"
              :data-slide-to="photo.id" :class="{ active: photo.id==0 }"></li>
          </ol>
          <div class="carousel-inner">

            <div class="carousel-item" v-for="photo in restaurant.album" v-bind:key="photo.id + photo.url"
              :class="{ active: photo.id==0 }">

              <button @click="removePhoto(photo.id)" id="removePhotoBtn" class="px-5 mb-2 mt-2">Remover foto</button>
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
        <h5>Nenhuma foto foi carregada</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-5 px-2">
        <button @click="replaceRouteProfile()" id="manageBtn" type="button" class="btn btn-block py-3">Gerir Reservas</button>
      </div>
      <div class="col-sm-1">
      </div>
      <div class="col-sm-6">
        <button @click="addPhoto()" id="addPhotoBtn" type="button" class="btn btn-block py-3">Adicionar Foto</button>
      </div>
    </div>
    <div class="row ">
      <div id="windowEditor" class="col-sm-6 img-thumbnail">
        <TableEditor :restaurant="restaurant"></TableEditor>
      </div>
      <div class="col-sm-6 ">
        <div>
          <div class="google-map img-fluid" id="myMap"></div>
        </div>
      </div>
    </div>
    <div id="finalCrate" class="row d-flex">
      <div @click="call('menu')" id="menu" class="col-sm-2 pt-3 mr-3 ml-3 mt-3" style="border-bottom-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold" style="color:white">Ementa</h5>
      </div>
      <div @click="call('album')" id="album" class="col-sm-2 pt-3 mr-3 ml-3 mt-3"
        style="border-bottom-lg light:1px solid black; border-left-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold" style="color:white">Categorias</h5>
      </div>
      <div @click="call('comments')" id="comentary" class="col-sm-2 pt-3 ml-3 mt-3 font-weight-bold "
        style="border-bottom-lg light:1px; border-left-lg light:1px; cursor:pointer">
        <h5 class="font-weight-bold" style="color:white">Comentários</h5>
      </div>
      <div class="col-sm-3" style="border-left-lg light:1px"></div>
      <div @click="call('info')" id="information" class="col-sm-2 mt-3 pt-1 "
        style="border-bottom-lg light:1px; border-left-lg light:3px; cursor:pointer">
        <h1 class="text-center font-weight-bold" style="color:white">i</h1>
      </div>
      <Comments v-show="component == 'comments'" v-for="comment in restaurant.comments" v-bind:comment="comment"
        v-bind:key="comment.username"></Comments>
      <TagEditor :restaurant="restaurant" v-show="component == 'album'"></TagEditor>
      <MenuEditor :restaurant="restaurant" v-show="component == 'menu'"></MenuEditor>
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

export default {
  data: () => ({
    component: "info",
    map: "",
    restaurant: ""
  }),
  mounted: function () {
    this.renderMap();
  },

  created: function () {
    this.restaurant = this.$store.getters.getRestaurantById(this.$route.params.id)
  },

  updated: function () {
    this.renderMap();
  },

  methods: {
    call(newComponent) {
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
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress(geocoder, this.map)
    },

    geocodeAddress(geocoder, resultsMap){
      const address = this.restaurant.address + ", " + this.restaurant.postalCode + " " + this.restaurant.local;
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
          id: this.restaurant.id
        }
      });
    },


    addPhoto() {
      let newPhoto = prompt("Link da imagem:")
      if (newPhoto != "") {
        this.$store.commit("ADD_PHOTO", {
          id: this.$route.params.id,
          url: newPhoto
        })
      } else {
        alert("Coloque o link da imagem!")
      }
    },


    removePhoto(id) {
      this.$store.commit("REMOVE_PHOTO", {
        removeId: id,
        restaurantId: this.restaurant.id
      })
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

#album{
    -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
}

#promotion {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
}

#menu {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
}

#comentary {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
}

#information {
  -webkit-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.25);
  background-color:#f17526;
  border-radius: 2px 2px 2px 2px;
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
  background-color: #f17526;
  border: none;
  color: #ffffff;
  font-weight: bold;
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

#addPhotoBtn {
  background-color: #f17526;
  border: none;
  color: #ffffff;
  font-weight: bold;
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

#removePhotoBtn {
  background-color: #f17526;
  border: none;
  color: #ffffff;
  font-weight: bold;
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
