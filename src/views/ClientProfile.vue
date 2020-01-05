<template>
  <div class="container">
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-12">
        <div class="row" style="border:1px solid black;">
          <div class="col-sm-3 text-center">
            <br />
            <br />
            <img
              src="../assets/Hachiman Profile Pic 1.jpg"
              class="rounded-circle"
              width="95px"
              height="95px"
            />
            <br />
            <h5 class="pt-2">Rui Gonçalves</h5>
            <button class="mt-2">Alterar Foto de Perfil</button>
          </div>

          <div class="col-sm-9">
            <div class="row justify-content-sm-around">
              <div
                class="col-sm-4 py-3"
                style="border-bottom:1px solid black; border-left:1px solid black;"
              >
                <h5 @click="call('info')">Informações Pessoais</h5>
              </div>
              <div
                class="col-sm-4 py-3"
                style="border-bottom:1px solid black; border-left:1px solid black;"
              >
                <h5 @click="call('history')">As Minhas Reservas</h5>
              </div>
              <div
                class="col-sm-4 py-3"
                style="border-bottom:1px solid black; border-left:1px solid black;"
              >
                <h5>Terminar Sessão</h5>
              </div>
            </div>
            <ClientInfo v-if="component == 'info'"> </ClientInfo>
            <ClientHistory v-if="component == 'history'"> </ClientHistory>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClientInfo from "@/components/ClientInfo.vue";
import ClientHistory from "@/components/ClientInfo.vue";
export default {
  data: () => ({
    component: "info"
  }),

  methods: {
    call(newComponent) {
      this.component = newComponent;
    }
  },
  components: {
    ClientInfo,
    ClientHistory
  }
};
</script>
