<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
      <div id="footer">
      <Footer></Footer>
    </div>
  </div>

</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    navbar: NavBar,
    Footer
  },

  created: function() {
    this.$store.commit("CREATE_BASE");
  }
};
</script>

<style>
html * {
  font-family: "Raleway";
}

</style>
