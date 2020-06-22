<template>
  <div class="history container" v-if="bookingHistory.length != 0">
    <br>
    <div v-if="bookingHistory.length != 0">
      <div v-for="reservation in bookingHistory" v-bind:key="reservation.id">

        <div v-if="reservation.confirmacao == 'p'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">Data de pedido{{reservation.data}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.n_cadeiras}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurante)}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.data_hora_reservada}}</p>

            <br>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4 pt-4 mt-3">
               
              </div>
              <div class="col-sm-4 pt-4 mt-3">
                
              </div>
              <div class="col-sm-2">
              </div>
            </div>
          </div>
        </div>







        <div v-if="reservation.confirmacao == 'c'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">Data de pedido{{reservation.data}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.n_cadeiras}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurante)}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.data_hora_reservada}}</p>

            <br>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4">
              </div>
              <div class="col-sm-6 pt-4 mt-3 ml-1">
                <img src="../assets/Yes Icon Border.png" width="51px">
              </div>
              <div class="col-sm-2">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
              </div>
              <div class="col-sm-9 mt-2">
                
              </div>
            </div>
          </div>
        </div>






        <div v-if="reservation.confirmacao == 'd'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">Data de pedido{{reservation.data}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.n_cadeiras}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurante)}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.data_hora_reservada}}</p>

            <br>
          </div>
           <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4">
              </div>
              <div class="col-sm-6 pt-4 mt-3 ml-1">
                <img src="../assets/No Icon Border.png" width="47px">
              </div>
              <div class="col-sm-2">
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div v-else>
      <h5>O seu histórico está vazio</h5>
    </div>

    <br>

  </div>
</template>


<script>
import bookingService from '../api/booking';
import usersService from '../api/users';

export default {
  data: () => ({
      bookingHistory: [],
  }),
  props:{
    id: {type: Number,
    required: true}
  },
  created: async function(){
    this.bookingHistory = await bookingService.getUserReservations(this.id);
  },
  methods:{
    async getUsername(id){
       return usersService.getRestaurantById(id).nome;
    }
  }
};
</script>

<style >
#historyRow{
      -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
}

#brownBoldText{
  color: #F17526;
  font-family: "Raleway";
  font-weight: bold;
  
}

#brownText{
  color: #F17526;
  font-family: "Raleway";
}

#whiteText{
  color: white;
  font-family: "Raleway";
  font-weight: bold;
  cursor:pointer
}
#orangeRow{
        -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);

}

</style>
