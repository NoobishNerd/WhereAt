<template>
  <div class="card">
    <h5>{{ restaurant.username }}</h5>

    <router-link to="/aboutRestaurant"
      ><img :src="restaurant.profilePic"
    /></router-link>

    <h3>{{ restaurant.local }}</h3>
    <h1>{{ restaurant.info }}</h1>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
  data: () => ({
    restaurant: ""
  }),
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
