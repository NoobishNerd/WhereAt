<template>
  <div class="card-group" style="cursor:pointer">
    <div class="container-fluid">
      <div class="card" v-bind:id="`restauranteN${restaurant.id_restaurant}`">
        <img
          class="card-img-top"
          :src="restaurant.profilePic"
          alt="Card image cap"
          @click="getAboutRestaurant"
        />
        <div class="card-body">
          <h6 class="card-title text-left">{{ restaurant.local }}</h6>
          <h5 class="card-title text-left " id="restaurantCardName">
            {{ restaurant.name }}
          </h5>
          <div v-if="restaurant.tag_name != ''">
            <p class="card-text text-left">
              {{ restaurant.tag_name }}
            </p>
          </div>
          <div v-else>
            <p class="card-text text-left">
              ~~~~~~~~~~~~
            </p>
          </div>
          <p class="card-text text-left">
            {{ rate }} | {{ num_comments }} avaliações
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import restaurantService from "../api/restaurants";
export default {
  name: "RestaurantCard",

  data: () => ({
    rate: 0,
    num_comments: 0,
    comments: []
  }),

  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },

  mounted: async function() {
    this.comments = await restaurantService.getRestaurantComments(
      this.restaurant.id_restaurant
    );

    if (this.comments.length != 0) {
      this.getAverageAndNumber();
    }
  },

  methods: {
    getAboutRestaurant() {
      this.$router.push({
        name: "aboutRestaurant",
        params: { id: this.restaurant.id_restaurant }
      });
    },

    getAverageAndNumber() {
      for (let comment of this.comments) {
        this.num_comments++;
        this.rate += comment.rating;
      }
      //average de ratings
      this.rate = (this.rate / this.num_comments).toFixed(1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-group {
  padding-bottom: 40px;
  font-family: "Raleway";
}
.card-body {
  padding: 0px;
  word-spacing: 1px;
  margin-top: 5px;
}
.card {
  padding-top: 3px;
  border: 0px;
  border-radius: 0px;
}
.container-fluid {
  padding: 0px;
}
p {
  color: black;
  margin: 0px;
}
h6 {
  color: black;
  margin: 0px;
}
h4 {
  margin: 0px;
}
#restaurantCardName {
  color: #f17526;
  margin-bottom: 0;
}
/* img {
  max-width: 100%;
} */
.card {
  width: 100%;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
