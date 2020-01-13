<template>
  <div class="container">
    <br>
    <br>
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-12">
        <div class="row" style="border:1px solid black; border-radius: 6px;">
          <div class="col-sm-3 text-center">
            <br />
            <br />
            <img src="../assets/circunvalacao-9.jpg" class="rounded-circle" width="95px" height="95px" />
            <br />
            <h5 class="pt-2" id="brownBoldText">Restaurante Circunvalacao</h5>
            <button id="smallerButton" class="mt-2">Alterar Foto de Perfil</button>
          </div>

          <div class="col-sm-9">
            <div class="row justify-content-sm-around">
              <div @click="call('history')" class="col-sm-4 " style="border-bottom:1px solid black; border-left:1px solid black; border-radius: 0px 0px 0px 6px; cursor:pointer;">
                <div class="row">
                  <div class="col-sm-2 pt-1">
                    <img src="../assets/Reservations Icon.png" width="47px"> 
                  </div>
                  <div class="col-sm-10 pt-3">
                    <h5 id="brownText">Gerir Reservas</h5>                    
                  </div>
                </div>
              </div>
              <div @click="call('vacations')" class="col-sm-4" style="border-bottom:1px solid black; border-left:1px solid black; cursor: pointer;">
                <div class="row">
                  <div class="col-sm-2">
                    <img src="../assets/Vacation Icon.png" width="45px"> 
                  </div>
                  <div class="col-sm-10 pt-3">
                    <h5 id="brownText">Encerramento</h5>                    
                  </div>
                </div>
              </div>
              <div @click="logout()" class="col-sm-4" style="border-bottom:1px solid black; border-left:1px solid black; cursor: pointer;">
                <div class="row">
                  <div class="col-sm-2 pt-2">
                    <img src="../assets/Logout Icon.png" width="42px"> 
                  </div>
                  <div class="col-sm-10 pt-3">
                    <h5 id="brownText">Terminar Sessão</h5>                    
                  </div>
                </div>
              </div>
            </div>
            <RestaurantHistory v-if="component == 'history'"> </RestaurantHistory>
            <RestaurantVacations v-if="component == 'vacations'"> </RestaurantVacations>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RestaurantHistory from "@/components/RestaurantHistory.vue";
import RestaurantVacations from "@/components/RestaurantVacations.vue";
export default {
  name: "profileRestaurant",
  data: () => ({
    component: "history",
    user: {
      id: "",
      username:"",
      profilePic:"",
      email:"",
      phone:"",
    }
  }),

  methods: {
    call(newComponent) {
      this.component = newComponent;
    },
    logout() {
      this.$store.commit("LOGOUT")
      localStorage.setItem("loggedUser", "")
      this.$router.replace("/")
    }
  
  },
  components: {
    RestaurantHistory,
    RestaurantVacations
  }

}
</script>

<style>
#brownBoldText{
  color: #F17526;
  font-family: "Raleway";
  font-weight: bold;
}

#brownText{
  color: #F17526;
  font-family: "Raleway";
}

#smallerButton {
  background-color: #F17526;
  border: none;
  color: white;
  padding: 10px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 10px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>

