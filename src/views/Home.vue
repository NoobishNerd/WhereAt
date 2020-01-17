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

      <br />

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h4 class="text-left" id="recommendationText">
            Recomendações Where@
          </h4>
          <hr />
          aqui é para meter as cartas do restaurante
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h4 class="text-left" id="recommendationText">Recomendações Porto</h4>
          <hr />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-5">
              <RestaurantCard
                v-for="restaurant in restaurants"
                v-bind:restaurant="restaurant"
                v-bind:key="restaurant.id"
              ></RestaurantCard>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-5">
              
            </div>
          </div>
        </div>

        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RestaurantCard from "@/components/RestaurantCard.vue";

export default {
  name: "home",

  data: () => ({
    restaurants: []
  }),

  created: function() {
    this.restaurants = this.$store.state.restaurants;
  },
  updated: function() {
    this.restaurants = this.$store.state.restaurants;
  },

  methods: {},

  components: {
    RestaurantCard
  }
};
</script>

<style>
#recommendationText {
  font-family: "Raleway";
  font-weight: bold;
  color: #966227;
}

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
  font-family: "Raleway";
  font-weight: bold;
  font-size: 43px;
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
