<template>
<div class="container mt-5" id="containerPrfl">
  

  <div class="client ">
    <div class="d-flex justify-content-end">
      <div @click="call('info')" style="cursor:pointer" class="mt-2">
        <img src="../assets/main_user.png" height="20px" style="vertical-align: middle; margin-right: 5px;" />
        <div class="text" id="brownText">Informações Pessoais</div>
      </div>
      <div @click="call('history')" style="cursor: pointer;" class="mt-2">
        <img src="../assets/Reservations Icon.png" height="30px" style="vertical-align: middle; margin-right: 5px;" />
        <div class="text" id="brownText">As Minhas Reservas</div>
      </div>
      <div @click="logout()" style="cursor: pointer;" class="mt-2">
        <img src="../assets/Logout Icon.png" height="20px" style="vertical-align: middle; margin-right: 5px;" />
        <div class="text" id="brownText">
          Terminar Sessão
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-sm-center flex-wrap pt-3">
      <div class="col-sm-3">
        <div class="text-center">
          <img :src="user.profilePic" class="rounded-circle" width="95px" height="95px" />
          <br />
          <h5 class="pt-2" id="brownBoldText">{{ user.username }}</h5>
          <button @click="changeUserImg" id="smallerButton" class="mt-2 py-2 px-3">
            Alterar Foto de Perfil
          </button>
        </div>
      </div>
      <div class="col-sm-9">
        <ClientInfo :user="user" v-if="component == 'info'"> </ClientInfo>
        <input @click="call('adminAuth')" v-if="component == 'history' && user.admin == true" type="button"
          value="Autorizar Restaurants" id="autorizeBtn" class="px-2 py-1 mt-1" />
        <AdminAuth v-if="component == 'adminAuth'"></AdminAuth>
        <ClientHistory :id="Number(user.id)" v-if="component == 'history'"></ClientHistory>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ClientInfo from "@/components/ClientInfo.vue";
import ClientHistory from "@/components/ClientHistory.vue";
import AdminAuth from "@/components/AdminAuth.vue";

  export default {
    name: "profileClient",
    data: () => ({
      component: "info",
      user: {
        id: "",
        username: "",
        profilePic: "",
        email: "",
        phone: "",
        admin: ""
      }
    }),

    created: function () {
      this.user = this.$store.getters.getUserById(this.$route.params.id);
    },
    updated: function () {
      this.user = this.$store.getters.getUserById(this.$route.params.id);
    },

    methods: {
      call(newComponent) {
        this.component = newComponent;
      },

      logout() {
        this.$store.commit("LOGOUT");
        localStorage.setItem("loggedUser", "");
        this.$router.replace("/");
      },

     

      changeUserImg() {
        let newUserImg = prompt("Link da imagem:");
        if (newUserImg != "") {
          this.user.profilePic = newUserImg;
          this.$store.commit("CHANGE_USER_IMG", {
            id: this.user.id,
            profilePic: this.user.profilePic
          });
        } else {
          alert("Coloque o link da imagem!");
        }
      }
    },
  components: {
    ClientInfo,
    ClientHistory,
    AdminAuth
  }
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
    color: #f17526;
    font-family: "Raleway";
    font-weight: bold;
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
    font-weight: bold;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  #containerPrfl{
      -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.20);
    border: none;
  border-radius: 10px 10px 10px 10px;
  }
  #autorizeBtn{
        background-color: #f17526;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
</style>