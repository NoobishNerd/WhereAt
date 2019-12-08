<template>
  

  <div class="home">
    <div class="row">
      <Navbar currentUserName="John Fields aka Pastelão"/>
    </div>

    
      <img alt="WhereAt logo" src="../assets/logo.png" />
      <HelloWorld msg="WHERE THE SITE @T ?!  bruh" />
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Navbar
  }
};
</script>
