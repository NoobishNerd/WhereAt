<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="col-sm-2">
        <router-link to="/"><h1> ICON </h1></router-link>
      </div>

      <div class="col-sm-2">
        
      </div>

      <div class="col-sm-4">
        <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>

   
      <div class="col-sm-2">
        <router-link to="/about">About</router-link>
      </div>

      <div class="col-sm-2">
        <h5>Logged in as: John Fields aka Pastelão</h5>
      </div>
      
      
    </nav>

    <router-view />
  </div>
</template>

<style>
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
