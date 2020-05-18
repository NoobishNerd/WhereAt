<template>
  <div class="card-group" style="cursor:pointer">
    <div class="container-fluid">
      <div class="card">
        <img
          class="card-img-top"
          :src="restaurant.profilePic"
          alt="Card image cap"
          @click="getAboutRestaurant"
        />
        <div class="card-body">
          <h6 class="card-title text-left">{{ restaurant.local }}</h6>
          <h4 class="card-title text-left " id="restaurantCardName">
            {{ restaurant.username }}
          </h4>
          <div v-for="tag of restaurant.tags" :key="tag.id">
            <p v-if="tag.main == true" class="card-text text-left">
              {{ tag.tag_name }}
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
export default {
  name: "RestaurantCard",

  data: () => ({
    rate: 0,
    num_comments: 0,
  }),

  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },

  mounted: function() {
    if (this.restaurant.comments.length != 0) {
      this.getAverageAndNumber();
    }
  },

  methods: {
    getAboutRestaurant() {
      this.$router.push({
        name: "aboutRestaurant",
        params: { id: this.restaurant.id },
      });
    },

    getAverageAndNumber() {
      for (let comment of this.restaurant.comments) {
        this.num_comments++;
        this.rate += comment.rate;
      }
      //average de ratings
      this.rate = (this.rate / this.num_comments).toFixed(1);
    },
  },
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
