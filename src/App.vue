<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm position:relative " style="padding: 5px; color: '#fcfcfc';">
        <div class="col-sm-2">
            <router-link to="/">
            <img src="./assets/Logotipo_Where_Texto.png"  class="navbar-brand" height="60%" width="60%">
            </router-link>
        </div>

        <div class="col-sm-3">

        </div>

        <div class="col-sm-2 text-center">
            <img src="./assets/Search Icon.png" width="20%" height="20%">
            
        </div>

        <div class="col-sm-4">
        <span v-if="this.$store.state.logged == true"><a @click="logout"> Logout</a></span>
        </div>

        <div v-if="this.$store.state.logged == true" class="col-sm-1">
        <h5>Logged in as: {{this.$store.loggedUser[0].name}} aka Pastelão</h5>
        </div>
        <div v-else class="col-sm-1" text-center>
            <router-link to="/login">
            <img src="./assets/Not Logged.png" width="80%" height="80%">
            </router-link>
        </div>
        


    </nav>

   

    <router-view />
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
       this.$store.commit('LOGOUT')
    }
  }
}
</script>

<style>
.navbar{
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.05);
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
</style>
  