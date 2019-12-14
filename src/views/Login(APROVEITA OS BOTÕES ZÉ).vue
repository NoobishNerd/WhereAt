<template>

  <div class="login">
      <button id="btnClient" type="button" class="btn btn-secondary btn-lg btn-block">Cliente</button>
      <button id="btnRestaurant" type="button" class="btn btn-secondary btn-lg btn-block">Restaurante</button>

      <div v-if="loginType == 'restaurant'">
          <LoginRestaurant />
      </div>
      <div v-if="loginType == 'client'">
          <LoginUser />
      </div>
      
      
    
    
  </div>
</template>

<script>

//NAO SEI O  QUE FAZER COM ESTE VUE



// @ is an alias to /src
import loginUser from "@/components/LoginUser.vue";
import loginRestaurant from "@/components/LoginRestaurant.vue";

let loginType = true;

if(loginType){
    document.getElementById("btnRestaurant").addEventListener(onclick, function(){
    loginType = "restaurant"
})

    document.getElementById("btnClient").addEventListener(onclick, function(){
    loginType = "client"
})
}


export default {
  name: "login",
  components: {
    loginUser,
    loginRestaurant
  }
};
</script>