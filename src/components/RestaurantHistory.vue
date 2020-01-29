<template>
  <div class="history container" v-if="reservations.length != 0">
    <br>
    <div v-if="reservations.length != 0">
      <div v-for="reservation in reservations" v-bind:key="reservation.id">

        <div v-if="reservation.confirmation == 'p'" id="historyRow" class="row mb-3 mr-1 mt-2">
           <div class="col-sm-8" style="border-right:2px solid">
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.sltdTable.capacity}}</p>
            <p class="text-left mb-0">Utilizador: {{getUsername(reservation.id_client)}}</p>
            <p class="text-left mb-0">Horas: {{reservation.hour}}</p>

            <br>
          </div>
          <div class="col-sm-4" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-2">
              </div>
              <div class="col-sm-4 pt-4 mt-3">
                <img
                  @click="accept(reservation.date, reservation.hour, reservation.id_client, reservation.id_restaurant, reservation.sltdTable.id)"
                  src="../assets/Yes Icon Border.png" width="51px">
              </div>
              <div class="col-sm-4 pt-4 mt-3">
                <img
                  @click="deny(reservation.date, reservation.hour, reservation.id_client, reservation.id_restaurant, reservation.sltdTable.id)"
                  src="../assets/No Icon Border.png" width="46px">
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
            <p class="text-left mb-0">Utilizador: {{getUsername(reservation.id_client)}}</p>
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
                <div class="custom-control custom-checkbox mr-sm-2">
                  <div v-if="reservation.presence == false">
                   <input @click="checkPresence(reservation.date, reservation.hour, reservation.id_client, reservation.id_restaurant, reservation.sltdTable.id)" type="checkbox" class="custom-control-input" id="customControlAutosizing">
                   <label class="custom-control-label" for="customControlAutosizing">Presença</label>
                  </div>
                  <div v-if="reservation.presence == true">
                   <input checked disabled type="checkbox" class="custom-control-input" id="customControlAutosizing">
                   <label class="custom-control-label" for="customControlAutosizing">Presença</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






        <div v-if="reservation.confirmation == 'd'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8" style="border-right:2px solid">
            <p class="text-left pt-3 mb-0 mt-1">{{reservation.date}}</p>
            <p class="text-left mb-0">Número de pessoas: {{reservation.sltdTable.capacity}}</p>
            <p class="text-left mb-0">Utilizador: {{getUsername(reservation.id_client)}}</p>
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
      <h5>Não há pedidos de reservas de momento...</h5>
    </div>

    <br>

  </div>
</template>

<script>
export default {
  data: () => ({
    reservations: []
  }),
  props:{
    id: {type:Number,
    required: true}
  },
  created: function(){
    this.reservations = this.$store.getters.getReservsByRestId(this.id)
    alert(this.reservations)
  },
  methods:{
    getUsername(id){
      return this.$store.getters.getUserById(id).username
    },

    accept(date, hour, id_client, id_restaurant, tableId){
      this.$store.commit("MANAGE_RESERVATION", {
        date: date,
        hour: hour,
        id_client: id_client,
        id_restaurant: id_restaurant,
        tableId: tableId,
        action: "c" //C === CONFIRM;  ZÉ! N MUDES!!!1111!
      })
    },

    deny(date, hour, id_client, id_restaurant, tableId){
      this.$store.commit("MANAGE_RESERVATION", {
        date: date,
        hour: hour,
        id_client: id_client,
        id_restaurant: id_restaurant,
        tableId: tableId,
        action: "d" //D === DENIED
      })
    },

    checkPresence(date, hour, id_client, id_restaurant, tableId){
      this.$store.commit("AUTHORIZE_COMMENT", {
        date: date,
        hour: hour,
        id_client: id_client,
        id_restaurant: id_restaurant,
        tableId: tableId
      })
    }
  }
};
</script>

<style scoped>
.custom-control-label{
  color: white;
  font-family: "Raleway";
}

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

