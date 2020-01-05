<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="img-wrapper">
            <img class="img-responsive" src="../assets/Nice Restaurant.png" />
            <div class="img-overlay">
              <router-link to="/editRestaurantProfile">
              <button id="jumboBtn" class="btn btn-responsive">
                Where at?
              </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <br>

      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-8">
          <h3 class="text-left" id="recommendationText">Recomendações Where@</h3>
          <hr>
          aqui é para meter as cartas do restaurante
        </div>
      </div>

      <br>

      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-8">
          <h3 class="text-left" id="recommendationText">Recomendações Porto</h3>
          <hr>
          e aqui também
        </div>
      </div>


    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import RestaurantCard from "@/components/RestaurantCard.vue";

//<RestaurantCard v-bind="r" v-for="r in restaurants"> </RestaurantCard>
export default {
  name: "home",

  data: () => ({
    restaurants: []
  }),

  created: function() {
    //making sure there is an array there ffs
    this.$store.commit("CREATE_BASE");

    this.restaurants = this.$store.state.restaurants;

    window.addEventListener("onload", function() {
      this.restaurants = this.$store.state.restaurants;
    });
  },

  methods: {
    checkStatus() {
      //WHAT'S GOING ON ELE VAI BUSCAR O ARRAY À STORAGE MAS LEVA TUDO UNDEFINED WHY???
      for (const restaurant in this.restaurants) {
        alert(restaurant.username);
        alert(restaurant.profilePic);
        alert(restaurant.approval);
      }
    }
  }
  /*
  components: {
    RestaurantCard
  }
  */
};
</script>

<style>
.img-wrapper {
  position: relative;
}

.img-responsive {
  width: 100%;
  height: auto;
}

.img-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.img-overlay:before {
  content: " ";
  display: block;
  /* adjust 'height' to position overlay content vertically */
  height: 30%;
}
#jumboBtn {
  /* matches 'btn-md' */
  width: 15%;
  height: 16%;
  font-family: "Raleway", bold;
  font-size: 45px;
  color: #966227;
  background-color: white;
  line-height: 120%;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  border-radius: 15px;
}

@media (max-width: 760px) {
  /* matches 'btn-xs' */
  .btn-responsive {
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
}
</style>
