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
    navbar: NavBar,
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
