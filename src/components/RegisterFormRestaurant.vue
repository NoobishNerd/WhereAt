<template>
  <div class="registerRes">
    <div class="header">
      <router-link to="/"
        ><font-awesome-icon icon="chevron-circle-left"
      /></router-link>
    </div>
    <div
      class="login d-flex align-items-center justify-content-center position-relative"
    >
      <div id="fromrRegister">
        <div class="">
          <div class="container col-12">
            <form v-on:submit.prevent="addUser()">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="registerName"
                  placeholder="Nome do Restaurante"
                  required
                  v-model="username"
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="registerEmail"
                  aria-describedby="emailHelp"
                  placeholder="Endereço de Email"
                  required
                  v-model="email"
                />
                <!-- <small id="emailHelp" class="form-text text-muted"
                  >Nunca partilharemos o seu email com ninguém :D</small
                > -->
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="registerPass"
                  placeholder="Password"
                  required
                  v-model="password"
                />
                <input
                  type="password"
                  class="form-control"
                  id="registerConfPass"
                  placeholder="Confirmar Password"
                  required
                  v-model="confPassword"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Morada"
                  required
                  v-model="address"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="postalCode"
                  placeholder="Código Postal"
                  required
                  v-model="postalCode"
                />
                <input
                  type="text"
                  class="form-control"
                  id="local"
                  placeholder="Localidade"
                  required
                  v-model="local"
                />
              </div>
              <button type="submit">
                Criar Conta
              </button>
              <small class="">
                <router-link to="/LoginRestaurant"
                  >Já possui conta?</router-link
                >
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersService from "../api/users.js";
import swal from "sweetalert2";

export default {
  name: "RegisterFormRestaurant",
  data: () => ({
    id: 0,
    username: "",
    email: "",
    password: "",
    confPassword: "",
    address: "",
    postalCode: "",
    local: "",
  }),

  methods: {
    async addUser() {
      //check se a password foi confirmada
      if (this.password != this.confPassword) {
        swal.fire("Erro", "Passwords Diferentes", "error");
      } else {
        const registerResponse = await usersService.registerRestaurant({
          name: this.username,
          password: this.password,
          address: this.address,
          postalCode: this.postalCode,
          local: this.local,
          email: this.email,
        });

        if (registerResponse == "Conta criada com Sucesso | Código Postal criado com Sucesso") {
          swal.fire("Registo", registerResponse, "success");
          //login
          const loginResponse = await usersService.getRestaurant({
            email: this.email,
            password: this.password,
          });

          if (loginResponse == "Credenciais Inválidos" || loginResponse == "Password Errada") {
            swal.fire("Erro", loginResponse, "error");
          } else {
            this.$store.commit("LOGIN", {
              id: loginResponse.id_restaurant,
              admin: 0,
              username: loginResponse.name,
              profilePic: loginResponse.profilePic,
              type: "restaurant",

            });
            swal.fire("Login", `Bem-vindo ${loginResponse.name}`, "success");
            this.$router.replace("/");
          }
        } else if (registerResponse == "Conta criada com Sucesso | Código Postal já Existente") {
          //login         
          const loginResponse = await usersService.getRestaurant({
            email: this.email,
            password: this.password,
          });

          if (loginResponse == "Credenciais Inválidos" || loginResponse == "Password Errada") {
            swal.fire("Erro", loginResponse, "error");
          } else {
            this.$store.commit("LOGIN", {
              id: loginResponse.id_restaurant,
              admin: 0,
              username: loginResponse.name,
              profilePic: loginResponse.profilePic,
              type: "restaurant",

            });
            swal.fire("Login", `Bem-vindo ${loginResponse.name}`, "success");
            this.$router.replace("/");
          }

        } else {
          swal.fire("Erro", registerResponse, "error");
        }
      }
    },

    goToLoginRestaurant() {
      this.$router.push({
        path: "/loginRestaurant",
      });
    },
  },
};
</script>

<style scoped>
.registerRes {
  background-image: url("../assets/home.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  left: 0%;
  top: 0%;
  width: 100vw;
  position: absolute;
}
#fromrRegister {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  width: 100%;
  max-width: 450px;
  position: relative;
  padding: 30px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
a {
  color: #af2831;
  text-decoration: none;
  font-weight: 400;
}
button[type="button"],
button[type="submit"],
button[type="reset"] {
  background-color: #af2831;
  border: none;
  color: #e3b814;
  display: inline-block;
  padding: 10px 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
button[type="button"]:active,
button[type="submit"]:active,
button[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="password"],
input[type="email"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:placeholder {
  color: #cccccc;
}
small {
  width: 85%;
  text-align: center;
  display: inline-block;
  margin-top: 15px;
  font-size: 12px;
}
.registerRes.header {
  padding: 15px 0px;
}

.registerRes .header a {
  color: white;
  font-size: 2rem;
  margin-left: 15px;
  text-decoration: none;
}
</style>
