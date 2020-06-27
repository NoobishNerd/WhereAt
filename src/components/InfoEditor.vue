<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="col-sm-10">
          <label class="mt-2" for="exampleFormControlTextarea1"
            >Editar Informação</label
          >
          <textarea
            v-model="restaurant.info"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
          ></textarea>
        </div>
        <div class="col-sm-2 align-self-center">
          <button
            @click="saveChanges"
            id="saveChangesBtn"
            class="py-4 px-2 mt-5 mr-3"
          >
            Salvar Mudanças
          </button>
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col-sm-12">
          <h6 style="color:black">
            <strong>Endereço:</strong> {{ restaurant.address }},
            {{ restaurant.postalCode }} {{ restaurant.local }}
          </h6>
          <h6 style="color:black" class="mt-4" v-if="restaurant.info == ''">
            Ainda não adicionou informações adicionais
          </h6>
          <h6 v-else class="mt-4" style="white-space: pre-wrap; color:black">
            {{ restaurant.info }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersService from "../api/users";

export default {
  name: "InfoEditor",
  data: () => ({}),
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },

  methods: {
    async saveChanges() {
      await usersService.updateRestaurant(
        {
          id_restaurant: this.restaurant.id_restaurant,
          name: this.restaurant.name,
          password: this.restaurant.password,
          profilePic: this.restaurant.profilePic,
          info: this.restaurant.info,
          address: this.restaurant.address,
          approval: this.restaurant.approval,
          postalCode: this.restaurant.postalCode,
          availability: this.restaurant.availability,
          email: this.restaurant.email
        },
        this.restaurant.id_restaurant
      );
    }
  }
};
</script>

<style scoped>
#saveChangesBtn {
  background-color: #302f30;
  border: none;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  -webkit-border-radius: 2px 2px 2px 2px;
  border-radius: 2px 2px 2px 2px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
