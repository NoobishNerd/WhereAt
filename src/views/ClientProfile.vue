<template>
  <div class="container">
    <br>
    <br>
    <div class="row d-flex justify-content-sm-center">
      <div class="col-sm-12">
        <div class="row" style="border-radius: 6px;" id="borderRow">
          <div class="col-sm-3 text-center">
            <br />
            <br />
            <img :src=user.profilePic class="rounded-circle" width="95px" height="95px" />
            <br />
            <h5 class="pt-2" id="brownBoldText">{{user.username}}</h5>
            <button @click="changeUserImg" id="smallerButton" class="mt-2 py-2 px-3">Alterar Foto de Perfil</button>
          </div>

          <div class="col-sm-9">
            <div class="row justify-content-sm-around">
              <div @click="call('info')" class="col-sm-4 shadow-sm rounded " style="cursor:pointer;">
                <div class="row">
                  <div class="col-sm-2 pt-1">
                    <img src="../assets/main_user.png" width="40px"> 
                  </div>
                  <div class="col-sm-10 pt-3">
                    <h5 class="text-center" id="brownText">Informações Pessoais</h5>                    
                  </div>
                </div>
              </div>
              <div @click="call('history')" class="col-sm-4 shadow-sm rounded" style="cursor: pointer;">
                <div class="row">
                  <div class="col-sm-2 pt-2">
                    <img src="../assets/Reservations Icon.png" width="42px"> 
                  </div>
                  <div class="col-sm-10 pt-3">
                    <h5 class="text-center" id="brownText">As Minhas Reservas</h5>                    
                  </div>
                </div>
              </div>
              <div @click="logout()" class="col-sm-4 shadow-sm rounded" style="cursor: pointer;">
                <div class="row">
                  <div class="col-sm-2 pt-2">
                    <img src="../assets/Logout Icon.png" width="39px">  
                  </div>
                  <div class="col-sm-10 pt-3 pl-1">
                    <h5 class="text-center" id="brownText">Terminar Sessão</h5>                    
                  </div>
                </div>
              </div>
            </div>
            <ClientInfo :user="user" v-if="component == 'info'"> </ClientInfo>
            <input @click="getAdminAuth" v-if="component == 'history' && user.admin == true" type="button" value="Autorizar Restaurants">
            <ClientHistory :id="Number(user.id)" v-if="component == 'history'"> </ClientHistory>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClientInfo from "@/components/ClientInfo.vue";
import ClientHistory from "@/components/ClientHistory.vue";
export default {
  name: "profileClient",
  data: () => ({
    component: "info",
    user: {
      id: "",
      username:"",
      profilePic:"",
      email:"",
      phone:"",
      admin:""
    }
  }),

  created: function() {
    this.user = this.$store.getters.getUserById(this.$route.params.id);
  },
  updated: function() {
    this.user = this.$store.getters.getUserById(this.$route.params.id);
  },

  methods: {
    call(newComponent) {
      this.component = newComponent;
    },

    logout() {      
      this.$store.commit("LOGOUT")
      localStorage.setItem("loggedUser", "")
      this.$router.replace("/")
    },

    getAdminAuth(){
      this.$router.push("/adminAuth")
    },

    changeUserImg(){
      let newUserImg = prompt("Link da imagem:")
      if (newUserImg != ""){
        this.user.profilePic = newUserImg
        this.$store.commit("CHANGE_USER_IMG",{
          id: this.user.id,
          profilePic: this.user.profilePic
        })
      }
      else{
        alert("Coloque o link da imagem!")
      }
    }
  },
  components: {
    ClientInfo,
    ClientHistory
  }
};
</script>

<style>
#brownBoldText{
  color: #F17526;
  font-family: "Raleway";
  font-weight: bold;
}

#brownText{
  color: #F17526;
  font-family: "Raleway";
}

#smallerButton {
  background-color: #F17526;
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
#borderRow{
    -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.25);
}
html{
  background-color:#FFFCF2;
}
</style>
