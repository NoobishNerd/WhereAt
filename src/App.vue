<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    navbar: NavBar
  },
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
