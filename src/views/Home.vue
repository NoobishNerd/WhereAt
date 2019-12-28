<template>
  <div class="home">
      <img @click="checkStatus" alt="WhereAt logo" src="../assets/Logotipo_Where_Texto.png" />
        <RestaurantCard :restaurants="restaurants" />
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
  components: {
    RestaurantCard
  }

};
</script>
