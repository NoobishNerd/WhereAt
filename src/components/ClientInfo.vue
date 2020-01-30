<template>
  <div class="info">
    <br />
    <br />
    <div class="row">
      <div class="col-sm-12" >
        <h5 id="boldText">Nome de Utilizador</h5>
        <input v-model="user.username" class="form-control" type="text"/>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <h5 id="boldText">Telemóvel</h5>
        <input v-model="user.phone" class="form-control" type="text" />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <h5 id="boldText">Email</h5>
        <input v-model="user.email" class="form-control" type="text"/>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-8"></div>
      <div class="col-sm-4">
        <button @click="saveChanges" id="smallerButton">Guardar Alterações</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props:{
    user:{
      type: Object,
      required: true
    }
  },

  methods:{
    saveChanges(){
      this.$store.commit("CHANGE_USER_PROFILE", this.user)
      this.saveStorage()
    },
    saveStorage(){
      localStorage.setItem("users", JSON.stringify(this.$store.state.users));
    }
  }
}
</script>

<style scoped>
#boldText{
  font-style: "Raleway";
  font-weight: bold;
  
}

.rale{
  font-style: "Raleway"
}

#smallerButton {
  background-color: #F17526;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 0px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.form-control{
  width: 200px;
}
</style>