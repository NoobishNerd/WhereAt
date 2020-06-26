<template>
  <div class="history container" v-if="bookingHistory.length != 0">
    <br>
    <div v-if="bookingHistory.length != 0">
      <div v-for="reservation in bookingHistory" v-bind:key="`${reservation.id_user} ${reservation.id_restaurant} ${reservation.id_table}`">

        <div v-if="reservation.confirmation == 'p'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.capacity}}</p>
            <p class="text-left mb-0">Restaurante: {{reservation.name}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.date_booked}}</p>

            <br>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4">
              </div>
              <div class="col-sm-6 pt-4 mt-3 ">
               <img src="../assets/help.png" width="63px">
              </div>
              <div class="col-sm-2">
                
              </div>
              <div class="col-sm-2">
              </div>
            </div>
          </div>
        </div>







        <div v-if="reservation.confirmation == 'c'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.capacity}}</p>
            <p class="text-left mb-0">Restaurante: {{reservation.name}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.date_booked}}</p>

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






        <div v-if="reservation.confirmation == 'd'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" >
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.capacity}}</p>
            <p class="text-left mb-0">Restaurante: {{reservation.name}}</p>
            <p class="text-left mb-0">Data e Hora Reservada: {{reservation.date_booked}}</p>

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

export default {
  data: () => ({
    bookingHistory: [],
  }),
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created: async function () {
    this.bookingHistory = await bookingService.getUserReservations(this.id);
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
