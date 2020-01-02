<template>
  <div class="home">
    <router-link to="/editRestaurantProfile">
      <img alt="WhereAt logo" src="../assets/Logotipo_Where_Texto.png" />
      </router-link>
       
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

  created: function(){
    //making sure there is an array there ffs
    this.$store.commit("CREATE_BASE")

    this.restaurants = this.$store.state.restaurants

    window.addEventListener("onload" , function(){
      this.restaurants = this.$store.state.restaurants
    })
  },

  methods:{
    checkStatus(){
      //WHAT'S GOING ON ELE VAI BUSCAR O ARRAY À STORAGE MAS LEVA TUDO UNDEFINED WHY???
      for (const restaurant in this.restaurants) {
        alert(restaurant.username)
        alert(restaurant.profilePic)
        alert(restaurant.approval)
      }
      
      
    }
  },
  /*
  components: {
    RestaurantCard
  }
  */
};
</script>
