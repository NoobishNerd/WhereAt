<template>
  <div class="history container" v-if="bookingHistory.length != 0">
    <br>
    <div v-if="bookingHistory.length != 0">
      <div v-for="reservation in bookingHistory" v-bind:key="reservation.id">

        <div v-if="reservation.confirmation == 'p'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" style="border-right:2px solid">
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.sltdTable.capacity}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurant)}}</p>
            <p class="text-left mb-0">Horas: {{reservation.hour}}</p>

            <br>
          </div>
          <div class="col-sm-4" style="background-color:#F17526">
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







        <div v-if="reservation.confirmation == 'c'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" style="border-right:2px solid">
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.sltdTable.capacity}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurant)}}</p>
            <p class="text-left mb-0">Horas: {{reservation.hour}}</p>

            <br>
          </div>
          <div class="col-sm-4" style="background-color:#F17526">
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
          <div class="col-sm-8" style="border-right:2px solid">
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.sltdTable.capacity}}</p>
            <p class="text-left mb-0">Restaurant: {{getUsername(reservation.id_restaurant)}}</p>
            <p class="text-left mb-0">Horas: {{reservation.hour}}</p>

            <br>
          </div>
           <div class="col-sm-4" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4">
              </div>
              <div class="col-sm-6 pt-4 mt-3 ml-1">
                <img src="../assets/No Icon Border.png" width="47x">
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
export default {
  data: () => ({
      bookingHistory: [],
  }),
  props:{
    id: {type: Number,
    required: true}
  },
  created: function(){
    alert("this.$store.getters.getReservsByClntId(this.id)")
    this.bookingHistory = this.$store.getters.getReservsByClntId(this.id)
    alert(JSON.stringify( this.bookingHistory))
  },
  methods:{
    getUsername(id_restaurant){
       return this.$store.getters.getRestaurantById(id_restaurant).username
    }
  }
};
</script>

<style >
#historyRow{
 border-style: solid; 
  border-width: 2px
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

</style>
