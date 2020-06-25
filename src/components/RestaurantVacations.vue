<template>
  <div class="vacations">
    <br />
    <br />
    <div class="row mb-5 pb-5">
      <div class="col-sm-12">
          <h4 v-if="available == true" class="text-left pt-2 pb-4 mb-4">Pretende encerrar o restaurante para férias?</h4>
          <h4 v-if="available == false" class="text-left pt-2 pb-4 mb-4">Pretender reativar as reservas para o restaurante?</h4>
      </div>
    </div>

    <div class="row pt-4 mt-4">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <button v-if="available == true" @click="goOnVacation(0)" id="smallerButton">Ir de Férias</button>
        <button v-if="available == false" @click="goOnVacation(1)" id="smallerButton">Reabrir Reservas</button>
      </div>
    </div>
  </div>
</template>
<script>
import usersService from '../api/users'

export default {
  data: () => ({
    id: "",
    available: "",
    restaurant: {}
  }),
  created: async function(){
    this.id = this.$route.params.id;
    this.restaurant = await usersService.getRestaurantById(this.id);
    this.available = this.restaurant.disponibilidade;
    
  },
  

  methods: {
    async goOnVacation(newStatus){


      await usersService.updateRestaurant({
                    id_restaurante: this.restaurant.id_restaurante,
                    nome: this.restaurant.nome,
                    password: this.restaurant.password,
                    foto_perfil: this.restaurant.foto_perfil,
                    informacao: this.restaurant.informacao,
                    morada: this.restaurant.morada,
                    aprovacao: this.restaurant.aprovacao,
                    cod_postal: this.restaurant.cod_postal,
                    disponibilidade: newStatus,
                    email: this.restaurant.email
      }, this.id);
      
      this.restaurant = await usersService.getRestaurantById(this.id);
      this.available = this.restaurant.disponibilidade;
    }
  }
}
</script>

<style scoped>
#boldText{
  font-style: "Raleway";

}

.rale{
  font-style: "Raleway"
}

#smallerButton {
  background-color: #F17526;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  margin: 0px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>