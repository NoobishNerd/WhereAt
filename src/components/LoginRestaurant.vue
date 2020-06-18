<template>
  <div class="loginRes">
        <div class="header">
      <router-link to="/"><font-awesome-icon icon="chevron-circle-left" /></router-link>
    </div>
    <div class="login d-flex align-items-center justify-content-center ">
      <div id="formContent" class="">
        <!-- Login Form -->
        <div class="row">
          <div class="col-12">
            <form v-on:submit.prevent="login()">
              <input
                v-model="emailLogin"
                type="text"
                id="login"
                class="fadeIn second"
                name="login"
                placeholder="Endereço de email"
              />
              <input
                v-model="passwordLogin"
                type="password"
                id="password"
                class="fadeIn third"
                name="login"
                placeholder="Password"
              />
              <input type="submit" class="fadeIn fourth" value="Login" />
              <span class="psw">
                <router-link to="/registerRestaurant"
                  >Não está registado?</router-link
                >
              </span>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRestaurant",
  data: () => ({
    emailLogin: "",
    passwordLogin: "",
  }),

  methods: {
    async login() {
      this.$store.commit("LOGIN", {
        email: this.emailLogin,
        password: this.passwordLogin,
        type: "restaurant",
      });
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.loginRes {
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

a {
  color: #af2831;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

/* STRUCTURE */


#formContent {
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
  margin-top: 150px;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #af2831;
  border: none;
  color: #e3b814;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 30px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
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
.loginRes.header {
  padding: 15px 0px;
}

.loginRes .header a {
  color: white;
  font-size: 2rem;
  margin-left: 15px;
  text-decoration: none;
}
</style>
