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

    <!-- eu não sei como querem organizar isto help-->
    <div class="row">
            <div class="col-sm-3 pr-0">
                <label class="mt-2" for="addPrefSlt">Escolher Preferência:</label>
                <select v-model="newPref" id="addPrefSlt" class="form-control">
                    <option v-for="tag in allTags" v-bind:key="tag.id_tag" :value="tag.id_tag">{{tag.tag_name}}</option>
                </select>
            </div>
            <div class="col-sm-1 mt-3 mr-5">
               <button @click="addPref()" id="addPrefBtn" class="mt-4 px-3 py-2">Escolher</button>
            </div>
            <div class="col-sm-3 pr-0">     
            </div>
            <div class="col-sm-1 mt-3">
            </div>
        </div>        
        <br>
        <div class="row">
            <div class="col-sm-3" v-for="tag in preferences" v-bind:key="tag.id_tag + 1000">                        
                <p style="color:white" class="text-center pref">{{tag.tag_name}}<span class="ml-2"><button @click="removePref(tag.id_tag)" id="addPrefBtn">X</button></span></p>
            </div>
        </div>
  </div>
</template>
<script>
import bookingService from '../api/booking'
import usersService from '../api/users';


export default {
  data: () => ({
    newPref: "",
    allTags: [],
    preferences: []
  }),
  props: {
    user: {
      type: Object,
      required: true
    }
  },



  created: async function () {

    this.allTags = await bookingService.getAllTags();

    this.preferences = await usersService.getUserTags(this.user.id_user);
  },


  methods: {

    async saveChanges() {
      await usersService.updateUser(
        {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
          admin: this.user.admin,
          profilePic: this.user.profilePic,
          phone: this.user.phone
        }
        ,
        this.user.id_user
      )
    },



    async addPref() {
      if (this.newPref != "") {
        await usersService.addUserTag(this.user.id_user, this.newPref);
        
        this.preferences = await usersService.getUserTags(this.user.id_user);
      }

    },

    async removePref(id) {
      await usersService.deleteUserTag(this.user.id_user, id);
      
      this.preferences = await usersService.getUserTags(this.user.id_user);
    }
  }
} 
</script>

<style scoped>
#boldText{
  font-style: "Raleway";
  
}

.rale{
  font-style: "Raleway"
}

.pref {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;

  background-color: #f17526;
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
  margin: 0px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

#addPrefBtn {
  background-color: #F17526;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

}

.form-control{
  width: 200px;
}
input{
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
}
</style>