<template>
  <div class="history container" v-if="reservations.length != 0">
    <br />
    <div v-if="reservations.length != 0">
      <div v-for="reservation in reservations" v-bind:key="reservation.id_utilizador + reservation.id_mesa">
        <div v-if="reservation.confirmacao == 'p'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8">
            <div class="ml-5">
              <p class="text-left pt-3 mb-0 mt-1">{{ reservation.data_hora }}</p>
              <p class="text-left mb-0">
                Número de pessoas: {{ reservation.n_cadeiras }}
              </p>
              <p class="text-left mb-0">
                Utilizador: {{ getUsername(reservation.id_utilizador) }}
              </p>
              <p class="text-left mb-0">Horas: {{ reservation.data_hora_reservada }}</p>

              <br />
            </div>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-2"></div>
              <div class="col-sm-4 pt-4 mt-3">
                <img @click="
                    accept(
                      reservation.id_utilizador,
                      reservation.id_restaurante,
                      reservation.id_mesa,
                      reservation.data_hora_reservada,
                      reservation.data_hora
                    )
                  " src="../assets/Yes Icon Border.png" width="51px" />
              </div>
              <div class="col-sm-4 pt-4 mt-3">
                <img @click="
                    deny(
                      reservation.id_utilizador,
                      reservation.id_restaurante,
                      reservation.id_mesa,
                      reservation.data_hora_reservada,
                      reservation.data_hora
                    )
                  " src="../assets/No Icon Border.png" width="46px" />
              </div>
              <div class="col-sm-2"></div>
            </div>
          </div>
        </div>

        <div v-if="reservation.confirmacao == 'c'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8">
            <div class="ml-5">
              <p class="text-left pt-3 mb-0 mt-1">{{ reservation.data_hora }}</p>
              <p class="text-left mb-0">
                Número de pessoas: {{ reservation.n_cadeiras }}
              </p>
              <p class="text-left mb-0">
                Utilizador: {{ getUsername(reservation.id_utilizador) }}
              </p>
              <p class="text-left mb-0">Horas: {{ reservation.data_hora_reservada }}</p>

              <br />
            </div>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-6 pt-4 mt-3 ml-1">
                <img src="../assets/Yes Icon Border.png" width="51px" />
              </div>
              <div class="col-sm-2"></div>
            </div>
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-9 mt-2">
                <div class="custom-control custom-checkbox mr-sm-2">
                  <div v-if="reservation.presence == false">
                    <input @click="
                        checkPresence(
                      reservation.id_utilizador,
                      reservation.id_restaurante,
                      reservation.id_mesa,
                      reservation.data_hora_reservada,
                      reservation.data_hora
                        )
                      " type="checkbox" class="custom-control-input" id="customControlAutosizing" />
                    <label class="custom-control-label" for="customControlAutosizing">Presença</label>
                  </div>
                  <div v-if="reservation.presence == true">
                    <!-- meter um simbolo -->
                    <tiny>Presente</tiny>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="reservation.confirmation == 'd'" id="historyRow" class="row mb-3 mr-1 mt-2">
          <div class="col-sm-8">
            <div class="ml-5">
              <p class="text-left pt-3 mb-0 mt-1">{{ reservation.data_hora }}</p>
              <p class="text-left mb-0">
                Número de pessoas: {{ reservation.n_cadeiras }}
              </p>
              <p class="text-left mb-0">
                Utilizador: {{ getUsername(reservation.id_utilizador) }}
              </p>
              <p class="text-left mb-0">Horas: {{ reservation.data_hora_reservada }}</p>

              <br />
            </div>
          </div>
          <div class="col-sm-4" id="orangeRow" style="background-color:#F17526">
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-6 pt-4 mt-3 ml-1">
                <img src="../assets/No Icon Border.png" width="47x" />
              </div>
              <div class="col-sm-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h5>Não há pedidos de reservas de momento...</h5>
    </div>

    <br />
  </div>
</template>

<script>
import bookingService from '../api/booking';
import usersService from '../api/users';
export default {

  //granada incendiária num contetor de lixo indiferenciado
  data: () => ({
    reservations: []
  }),
  props: {
    id: {
      required: true
    }
  },
  created: async function () {
    this.reservations = await bookingService.getRestaurantReservations(this.id);
  },

  methods: {
    async getUsername(id) {
      return await usersService.getUserById(id).user_name;
    },

    async accept(id_u, id_rest, id_m, data_hora_reservada, data_hora) {
      //clusterfuck a tentar confirmar isto localmente no componente
      this.reservations.find(reservation => reservation.id_utilizador == id_u && reservation.id_restaurante == id_rest && reservation.id_mesa == id_m).confirmacao = 'c';

      await bookingService.updateReservation({
        data_hora_reservada: data_hora_reservada,
        data_hora: data_hora,
        newConfirmacao: "c",
        newPresenca: 0
      }, id_u, id_rest, id_m);
      
      this.reservations = await bookingService.getRestaurantReservations(this.id);
    },

    async deny(id_u, id_rest, id_m, data_hora_reservada, data_hora) {
      //clusterfuck a tentar confirmar isto localmente no componente
      this.reservations.find(reservation => reservation.id_utilizador == id_u && reservation.id_restaurante == id_rest && reservation.id_mesa == id_m).confirmacao = 'd';

      await bookingService.updateReservation({
        data_hora_reservada: data_hora_reservada,
        data_hora: data_hora,
        newConfirmacao: "d",
        newPresenca: 0
      }, id_u, id_rest, id_m);
      
      this.reservations = await bookingService.getRestaurantReservations(this.id);
    },

   async checkPresence(id_u, id_rest, id_m, data_hora_reservada, data_hora) {
      //clusterfuck a tentar confirmar isto localmente no componente
      this.reservations.find(reservation => reservation.id_utilizador == id_u && reservation.id_restaurante == id_rest && reservation.id_mesa == id_m).presenca = 1;

      await bookingService.updateReservation({
        data_hora_reservada: data_hora_reservada,
        data_hora: data_hora,
        newConfirmacao: "c",
        newPresenca: 1
      }, id_u, id_rest, id_m);

      this.reservations = await bookingService.getRestaurantReservations(this.id);
    }
  }
};
</script>

<style scoped>

#historyRow{
        -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
}

#orangeRow{
        -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
}

.custom-control-label {
  color: white;
  font-family: "Raleway";
}

#brownBoldText {
  color: #f17526;
  font-family: "Raleway";

}

#brownText {
  color: #f17526;
  font-family: "Raleway";
}

#whiteText {
  color: white;
  font-family: "Raleway";

  cursor: pointer;
}
</style>
