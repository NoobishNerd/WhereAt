<template>
  <div class="card mb-3">
    <h5>{{ restaurant.username }}</h5>

    
    <img :src="restaurant.profilePic" @click="getAboutRestaurant"/>
    

    <h3>{{ restaurant.local }}</h3>
    <h1>{{ restaurant.info }}</h1>

  </div>
  
</template>

<script>
export default {
  name: "RestaurantCard",

  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  //COMO FAÇO ISTO EM ROUTER-LINK TO=""???
  methods: {
    getAboutRestaurant() {
      this.$router.push({
        name: 'aboutRestaurant',
        params: {
          id: this.restaurant.id
        }
      })
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
