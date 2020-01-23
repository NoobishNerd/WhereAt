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
        <button v-if="available == true" @click="goOnVacation" id="smallerButton">Ir de Férias</button>
        <button v-if="available == false" @click="goOnVacation" id="smallerButton">Reabrir Reservas</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    id: "",
    available: ""
  }),
  created: function(){
    this.id = this.$route.params.id
    this.available = this.$store.getters.getRestaurantById(this.id).available
    
  },
  updated: function(){
    this.updateText()
  },

  methods: {
    goOnVacation(){
      //commit retorna available atual
      this.$store.commit("VACATION", {id: this.id})
      if (this.available == true){
        this.available = false
      }
      else if (this.available == false){
        this.available = true
      }
      this.updateText()
    }
  }
}
</script>

<style scoped>
#boldText{
  font-style: "Raleway";
  font-weight: bold;
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
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 0px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>