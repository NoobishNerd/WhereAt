<template>
  <div id="fromrRegister">
    <div
      class="login d-flex align-items-center justify-content-center position-relative"
    >
      <div class="container col-sm-4">
        <form v-on:submit.prevent="addUser()">
          <div class="form-group">
            <label for="registerName">Nome:</label>
            <input
              type="text"
              class="form-control"
              id="registerName"
              placeholder="Insira o seu nome"
              required
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label for="registerEmail">E-mail:</label>
            <input
              type="email"
              class="form-control"
              id="registerEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              v-model="email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="registerPass">Password:</label>
            <input
              type="password"
              class="form-control"
              id="registerPass"
              placeholder="Password"
              required
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="registerConfPass">Confirmar Password:</label>
            <input
              type="password"
              class="form-control"
              id="registerConfPass"
              placeholder="Confirme sua Password"
              required
              v-model="confPassword"
            />
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
    name: "",
    email: "",
    password: "",
    confPassword: ""
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
      return this.$store.getters.getLastUserId;
    },
    addUser() {
      //check se a password foi confirmada
       if(this.password != this.confPassword){
         alert("PASSWORDS DIFERENTES");
       }else{
         this.$store.commit("ADD_USER", {
          id: this.getLastId(),
          email: this.email,
          name: this.name,
          password: this.password
        });

        this.saveStorage()
       }
                

      
    },
    saveStorage() {
      localStorage.setItem("users", JSON.stringify(this.$store.state.users));
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(this.$store.state.loggedUser)
      );
    }
  }
};
</script>
~

<style></style>
