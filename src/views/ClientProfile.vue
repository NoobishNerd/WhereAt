<template>
  <div class="container mt-5" id="containerPrfl">
    <div class="client ">
      <div class="d-flex justify-content-end">
        <div @click="call('info')" style="cursor:pointer" class="mt-2">
          <img
            src="../assets/main_user.png"
            height="20px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">Informações Pessoais</div>
        </div>
        <div @click="call('history')" style="cursor: pointer;" class="mt-2">
          <img
            src="../assets/Reservations Icon.png"
            height="30px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">As Minhas Reservas</div>
        </div>
        <div @click="logout()" style="cursor: pointer;" class="mt-2">
          <img
            src="../assets/Logout Icon.png"
            height="20px"
            style="vertical-align: middle; margin-right: 5px;"
          />
          <div class="text" id="brownText">
            Terminar Sessão
          </div>
        </div>
      </div>
      <div id="#profileCol" class="row d-flex pt-3">
        <div class="col-sm-3" id="colPrl">
          <div class="text-center">
            <img
              :src="user.foto"
              class="rounded-circle"
              width="95px"
              height="95px"
            />
            <br />
            <h5 class="pt-2" id="brownBoldText">{{ user.user_name }}</h5>
            <button
              @click="changeUserImg"
              id="smallerButton"
              class="mt-2 py-2 px-3"
            >
              Alterar Foto de Perfil
            </button>
          </div>
        </div>
        <div class="col-sm-9">
          <ClientInfo :user="user" v-if="component == 'info'"> </ClientInfo>
          <input
            @click="call('adminAuth')"
            v-if="component == 'history' && user.administrador == true"
            type="button"
            value="Autorizar Restaurants"
            id="autorizeBtn"
            class="px-2 py-1 mt-1"
          />
          <AdminAuth v-if="component == 'adminAuth'"></AdminAuth>
          <ClientHistory
            :id="Number(user.id_utilizador)"
            v-if="component == 'history'"
          ></ClientHistory>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientInfo from "@/components/ClientInfo.vue";
import ClientHistory from "@/components/ClientHistory.vue";
import AdminAuth from "@/components/AdminAuth.vue";

import usersService from '../api/users.js';

export default {
  name: "profileClient",
  data: () => ({
    component: "info",
    user: {}
  }),

  created: async function () {
    this.user = await usersService.getUserById(this.$route.params.id);
  },
  // updated: async function () {
  //   this.user = await usersService.getUserById(this.$route.params.id);
  // },

  methods: {
    call(newComponent) {
      this.component = newComponent;
    },

    logout() {
      this.$store.commit("LOGOUT");
      localStorage.setItem("loggedUser", "");
      this.$router.replace("/");
    },

    async changeUserImg() {
      let newUserImg = prompt("Link da imagem:");
      if (newUserImg != "") {
        usersService.updateUser({
          user_name: this.user.user_name,
          email: this.user.email,
          password: this.user.password,
          administrador: this.user.administrador,
          foto: newUserImg,
          numero_tel: this.user.numero_tel
        })
      } else {
        alert("Coloque o link da imagem!");
      }
    },
  },
  components: {
    ClientInfo,
    ClientHistory,
    AdminAuth,
  },
};
</script>

<style scoped>
.text {
  margin-right: 15px;
  vertical-align: middle;
  display: inline;
}

.text-center {
  vertical-align: middle !important;
}

#brownBoldText {
  color: black;
  font-family: "Raleway";
}

#brownText {
  color: #f17526;
  font-size: 20px;
  font-family: "Raleway";
}

#smallerButton {
  background-color: #f17526;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#containerPrfl {
  border: none;
  border-radius: 10px 10px 10px 10px;
}
#autorizeBtn {
  background-color: #f17526;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;

  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

#colPrl {
  margin-top: 50px;
}

</style>
