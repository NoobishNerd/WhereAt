<template>
  <div id="navBar">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/">
        <img src="../assets/Logotipo_Where_Texto.png" class="navbar-brand ml-1" height="50px" />
      </router-link>
      <form class="form-inline">
        <div class="span3 widget-span widget-type-raw_html custom-search" style="" data-widget-type="raw_html"
          data-x="4" data-w="3">
          <div class="cell-wrapper layout-widget-wrapper">
            <span id="hs_cos_wrapper_module_14308928327274411"
              class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_raw_html" style=""
              data-hs-cos-general-type="widget" data-hs-cos-type="raw_html">
              <form v-on:submit.prevent="getSearchResults()" method="GET" action="https://www.shopwithscrip.com/Search?"
                role="search" class="navbar-form navbar-left ng-pristine ng-valid" id="express-form" novalidate="">
                <input v-model="searchText" required="" name="q" id="express-form-typeahead" placeholder="Search"
                  class="form-control tt-input" autocomplete="off" spellcheck="false" dir="auto" type="text" />
                <button class="search-btn" type="submit">
                  <span class="icon"></span>
                </button>
              </form>
            </span>
          </div>
          <!--end layout-widget-wrapper -->
        </div>

        <img @click="getProfile" v-if="this.$store.state.logged == true"
          v-bind:src="loggedUser.profilePic" class="rounded-circle" width="40px" height="40px"
          style="cursor: pointer" />
        <div v-else text-center>
          <router-link to="/login">
            <img src="../assets/main_user.png" height="40px" />
          </router-link>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
    searchText: "",
    filterMaybe: "",
    restaurants: "",
    loggedUser: ""

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

    getProfile() {
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
      
    },

    getSearchResults(){
	    this.restaurants = this.$store.getters.getSearchResults(this.searchText)
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
.custom-search {
  position: relative;
}
#express-form-typeahead {
  background-color: transparent;
  background-image: url(../assets/main_lupa.png);
  background-position: 5px center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
  border: none;
  cursor: pointer;
  height: 40px;
  margin: 3px 0;
  padding: 0 0 0 42px;
  position: relative;
  -webkit-transition: width 400ms ease, background 400ms ease;
  transition: width 400ms ease, background 400ms ease;
  width: 0;
  box-shadow: none;
}
#express-form-typeahead:focus {
  background-color: #fff;
  border: 2px solid black;
  cursor: text;
  outline: 0;
  width: 230px;
}
.search-btn {
  display: none;
}
input[type="search"] {
  -webkit-appearance: textfield;
}
</style>
