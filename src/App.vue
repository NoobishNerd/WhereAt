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
