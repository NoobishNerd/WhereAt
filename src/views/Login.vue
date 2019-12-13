<template>
  

  <div class="login">
    
      <img alt="WhereAt logo" src="../assets/Logotipo_Where_Texto.png" />

      <LoginRestaurant />
      <LoginUser />
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import loginUser from "@/components/LoginUser.vue";
import loginRestaurant from "@/components/LoginRestaurant.vue";


export default {
  name: "login",
  components: {
    loginUser,
    loginRestaurant
  }
};
</script>