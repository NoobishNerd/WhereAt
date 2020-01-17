<template>
  <div class="vacations">
    <br />
    <br />
    <div class="row mb-5 pb-5">
      <div class="col-sm-12">
          <h4 class="text-left pt-2 pb-4 mb-4">{{vacationQuestion}}</h4>
      </div>
    </div>

    <div class="row pt-4 mt-4">
      <div class="col-sm-9"></div>
      <div class="col-sm-3">
        <button @click="goOnVacation" id="smallerButton">{{vacationBtn}}</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    vacationBtn: "",
    vacationQuestion: "",
    id: ""
  }),
  created: function(){
    this.id = this.$route.params.id
    //get available do restaurante
    if(!(this.$store.getters.getRestaurantById(this.$route.params.id).available)){
      this.vacationBtn="Reabrir Reservas"
      this.vacationQuestion="Pretender reativar as reservas para o restaurante?"
    }else{
      this.vacationBtn="Ir de Férias"
      this.vacationQuestion="Pretende encerrar o restaurante para férias?"
    }
  },
  updated: function(){
    this.id = this.$route.params.id
    //get available do restaurante
    if(!(this.$store.getters.getRestaurantById(this.$route.params.id).available)){
      this.vacationBtn="Reabrir Reservas"
      this.vacationQuestion="Pretender reativar as reservas para o restaurante?"
    }else{
      this.vacationBtn="Ir de Férias"
      this.vacationQuestion="Pretende encerrar o restaurante para férias?"
    }
  },
  methods: {
    goOnVacation(){
      //commit retorna available atual
      if(!(this.$store.commit("VACATION", {id: this.id}))){
        this.vacationBtn="Reabrir Reservas"
        this.vacationQuestion="Pretender reativar as reservas para o restaurante?"
      }else{
        this.vacationBtn="Ir de Férias"
        this.vacationQuestion="Pretende encerrar o restaurante para férias?"
      }
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