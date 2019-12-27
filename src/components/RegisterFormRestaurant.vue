<template>
    <div id="fromrRegister">
        <div class="login d-flex align-items-center justify-content-center position-relative">
            <div class="container col-sm-4">
                <form v-on:submit.prevent="addUser()">
                    <div class="form-group">
                        <input type="text" class="form-control" id="registerName" placeholder="Nome do Restaurante" required
                            v-model="username" />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp"
                            placeholder="Endereço Email" required v-model="email" />
                        <small id="emailHelp" class="form-text text-muted">Nunca partilharemos o seu email com ninguém
                            :D</small>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="registerPass" placeholder="Password" required
                            v-model="password" />
                        <input type="password" class="form-control" id="registerConfPass"
                            placeholder="Confirmar Password" required v-model="confPassword" />
                    </div>
                    <hr>
                    <div class="form-group">
                    <input type="text" class="form-control" id="address"
                            placeholder="Morada" required v-model="address" />
                    </div>
                    <div class="form-group">
                    <input type="text" class="form-control" id="postalCode"
                            placeholder="Código Postal" required v-model="postalCode" />                
                    <input type="text" class="form-control" id="local"
                            placeholder="Localidade" required v-model="local" />
                    </div>
                    <button type="submit" class="btn btn-primary  float-right">
                        Criar Conta
                    </button>
                    <button type="button" class="btn btn-link float-right">
                        <router-link to="/login">Login</router-link>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({
    id: 0,
    username: "",
    email: "",
    password: "",
    confPassword: "",
    address: "",
    postalCode: "",
    local: ""
  }),
  created: function() {
    
    //quando sai guarda o user autenticado e array users na localStorage
    window.addEventListener("unload", this.saveStorage);
    if (localStorage.getItem("users")) {
      this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("loggedUser")) {
      this.$store.state.loggedUser = JSON.parse(
        localStorage.getItem("loggedUser")
      );
    }
    

  },
  methods: {
    getLastId() {
      return this.$store.getters.getLastRestaurantId;
    },
    addUser() {
      //check se a password foi confirmada
       if(this.password != this.confPassword){
         alert("PASSWORDS DIFERENTES");
       }else{
         this.$store.commit("ADD_RESTAURANT", {
          id: this.getLastId(),
          email: this.email,
          username: this.username,
          password: this.password,
          address: this.address,
          postalCode: this.postalCode,
          local: this.local
        });

        this.saveStorage()
       }
                

      
    },
    saveStorage() {
      localStorage.setItem("restaurants", JSON.stringify(this.$store.state.restaurants));
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(this.$store.state.loggedUser)
      );
    }
  }
};
</script>


<style></style>

