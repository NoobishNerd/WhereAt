<template>

<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">

    </div>

    <!-- Login Form -->
    <form>
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="Endereço de email">
      <input type="text" id="password" class="fadeIn third" name="login" placeholder="Password">
      <input type="submit" class="fadeIn fourth" value="Login">
      <link href="https://fonts.googleapis.com/css?family=Raleway:700&display=swap" rel="stylesheet">
    </form>


  </div>
</div>
</template>

<script>
export default {
  name: "Login",
   data: () => ({
       emailLogin:"",
       passwordLogin: "",
   }),
   created: function () {
            if (localStorage.getItem("users")) {
                this.$store.state.users = JSON.parse(localStorage.getItem("users"))
            }
            if(localStorage.getItem("loggedUser")){
                this.$store.state.loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
            }
        },
   methods:{
       login(){
           this.$store.commit('LOGIN',{
               email:this.emailLogin,
               password:this.passwordLogin,
           })
       },
   },
   
};
</script>
<style>




a {
  color: #E3B814;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}




/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  flex-direction: column; 
  padding: 200px;
  font-family: 'Raleway', bold;
  
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 100%;
  max-width: 450px;
  position: relative;
  padding: 30px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
  font-size: 20px;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}









/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #E3B814;
  border: none;
  color: #AF2831;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 20px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 30px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}


input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}


input[type=text]:placeholder {
  color: #cccccc;
}



</style>