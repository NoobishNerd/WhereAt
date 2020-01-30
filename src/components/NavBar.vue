<template>
  <div id="navBar">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/">
        <img src="../assets/Logotipo_Where_Texto.png" class="navbar-brand ml-1" height="50px" />
      </router-link>
      <form class="form-inline">
        

        <img @click="goToProfile" v-if="this.$store.state.logged == true"
          v-bind:src="loggedUser.profilePic" class="rounded-circle" width="40px" height="40px"
          style="cursor: pointer" />
        <div v-else text-center>
            <img @click="showOpts" src="../assets/main_user.png" height="40px" />
        </div>
      </form>
    </nav>
    <div v-show="show == true">
      <router-link to="/login">
    <div class="row">
        <button id="btnAmClient" @click="showOpts" type="button" class="btn btn-block"><span>Cliente</span></button>
    </div>
    </router-link>
    <router-link to="/loginRestaurant">
    <div class="row">
        <button id="btnAmRestaurant" @click="showOpts" type="button" class="btn btn-block"><span>Restaurante</span></button>
    </div>
    </router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    restaurants: "",
    loggedUser: "",
    show: false

  }),

  created: function(){
    this.loggedUser = this.$store.getters.getLoggedUser
  },
  updated: function(){
    this.loggedUser = this.$store.getters.getLoggedUser
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      localStorage.setItem("loggedUser", "");
    },

    showOpts(){ //show options or nah?
      this.show = this.show ? false : true;
    },

    goToProfile() {
      if(this.loggedUser.type == "client"){
        this.$router.push({
          name: "clientProfile",
          params: { id: this.loggedUser.id }
        });
      } 
      if(this.loggedUser.type == "restaurant"){
        this.$router.push({
          name: "restaurantEditor",
          params: { id: this.loggedUser.id }
        });
      }
      
    }
  }
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.05);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#btnAmClient{
  background-color: #e3b814;
  border: none;
  color: #af2831;
  padding: 25px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  transition: all 0.5s;
  cursor: pointer;  
}

#btnAmRestaurant{
  background-color: #af2831;
  border: none;
  color: #e3b814;
  padding: 25px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  transition: all 0.5s;
  cursor: pointer;
}

</style>
