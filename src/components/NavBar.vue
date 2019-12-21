<template>
  <div id="navBar">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/">
        <img
          src="../assets/Logotipo_Where_Texto.png"
          class="navbar-brand ml-1"
        />
      </router-link>
      <form class="form-inline">
        <img src="../assets/main_lupa.png" />
        <span v-if="this.$store.state.logged == true">
          <a @click="logout">Logout</a>
        </span>
        <div v-if="this.$store.state.logged == true">
          <h5>
            Logged in as: {{ this.$store.loggedUser[0].name }} aka Pastelão
          </h5>
        </div>
        <div v-else text-center>
          <router-link to="/login">
            <img src="../assets/main_user.png" />
          </router-link>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  methods: {
    logout() {
      this.$store.commit("LOGOUT");
    }
  }
};
</script>

<style>
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

img {
  height: 50px;
}

@media (max-width: 992px) {
  img {
    height: 40px;
  }
}
</style>
