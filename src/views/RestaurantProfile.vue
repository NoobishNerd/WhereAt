<template>
  <div class="container mt-5 " id="containerRest">
    <div class="restaurant">
      <div class="d-flex justify-content-end">
        <div @click="call('history')" style="cursor:pointer;">
          <img
            src="../assets/Reservations Icon.png"
            height="30px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">Gerir Reservas</div>
        </div>
        <div @click="call('vacations')" style="cursor: pointer;">
          <img
            src="../assets/Vacation Icon.png"
            height="20px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">Encerramento</div>
        </div>
        <div @click="logout()" style="cursor:pointer;">
          <img
            src="../assets/Logout Icon.png"
            height="20px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">Terminar Sessão</div>
        </div>
      </div>
      <div class="row d-flex justify-content-sm-center flex-wrap pt-3">
        <div class="col-sm-3" id="colRest">
          <img
            :src="restaurant.profilePic"
            class="rounded-circle"
            width="95px"
            height="95px"
          />
          <h5 class="pt-2 text-center" id="brownBoldText">{{ restaurant.name }}</h5>
          <button @click="changeRestaurantImg" id="smallerButton" class="mt-2">
            Alterar Foto de Perfil
          </button>
        </div>
        <div class="col-sm-9">
          <RestaurantHistory
            :id="this.$route.params.id"
            v-if="component == 'history'"
          >
          </RestaurantHistory>
          <RestaurantVacations
            v-if="component == 'vacations'"
          >
          </RestaurantVacations>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RestaurantHistory from "@/components/RestaurantHistory.vue";
import RestaurantVacations from "@/components/RestaurantVacations.vue";
import swal from "sweetalert2";

import usersService from '../api/users.js';
export default {
  name: "profileRestaurant",
  data: () => ({
    component: "history",
    restaurant: {
      id: "",
      username: "",
      profilePic: "",
      email: "",
      phone: ""
    }
  }),
  created: async function () {
    this.restaurant = await usersService.getRestaurantById(this.$route.params.id);
  },


  methods: {
    call(newComponent) {
      this.component = newComponent;
    },

    logout() {
      this.$store.commit("LOGOUT");
      localStorage.setItem("loggedUser", "");
      this.$router.replace("/");
    },

    async changeRestaurantImg() {
       const {
        value: url
      } = await swal.fire({
        input: 'url',
        inputPlaceholder: 'Enter the URL'
      })
      if (url) {
        await usersService.updateRestaurant({
            id_restaurant: this.restaurant.id_restaurant,
            name: this.restaurant.name,
            password: this.restaurant.password,
            profilePic: url,
            info: this.restaurant.info,
            address: this.restaurant.address,
            approval: this.restaurant.approval,
            postalCode: this.restaurant.postalCode,
            availability: this.restaurant.availability,
            email: this.restaurant.email
          },
          this.$route.params.id,
        )
        this.restaurant.profilePic = url;
        this.$store.commit("CHANGE_USER_IMG", {
          profilePic: url
        });
      }
    }
  },
  components: {
    RestaurantHistory,
    RestaurantVacations
  }
};
</script>

<style>
#containerRest{
  border: none;
  border-radius: 10px 10px 10px 10px;

}

#colRest{
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
}

.text {
  margin-right: 15px;
  vertical-align: middle;
  display: inline;
  font-size: 20px;
}
.text-center {
  vertical-align: middle !important;
}

#brownBoldText {
  color: black;
  font-family: "Raleway";
}

#brownText {
  color: #f17526;
  font-family: "Raleway";
}

#smallerButton {
  background-color: #f17526;
  border: none;
  color: white;
  padding: 10px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 10px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
