<template>
<div class="container">
    <div class="form-group">
        <div class="row">
            <div class="col-sm-10">
                <label class="mt-2" for="exampleFormControlTextarea1">Editar Informação</label>
                <textarea v-model="restaurant.info" class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
            </div>
            <div class="col-sm-2 align-self-center">
                <button @click="saveChanges" id="saveChangesBtn" class="py-4 px-2 mt-5 mr-3">Salvar Mudanças</button>
            </div>   
        </div>

        <br>

        <div class="row">
            <div class="col-sm-12">
                <h4>Informações relevantes</h4>
                <hr>
                <h6 style="color:black"><strong>Endereço:</strong> {{restaurant.address}}, {{restaurant.postalCode}} {{restaurant.local}}</h6>
                <h6 style="color:black"><strong>Telefone:</strong> {{restaurant.phone}}</h6>
                <h6 style="color:black" class="mt-4" v-if="restaurant.info == ''">Ainda não adicionou informações adicionais</h6>
                <h6 v-else class="mt-4" style="white-space: pre-wrap; color:black">{{restaurant.info}}</h6>

            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "InfoEditor",
  data: () => ({

  }),
  props:{
    restaurant:{
      type: Object,
      required: true
    }
  },

  methods: {
      saveChanges() {
          localStorage.setItem("restaurants", JSON.stringify(this.$store.state.restaurants))
          alert("Mudanças Salvas")
      }
  }

}
</script>

<style scoped>
    #saveChangesBtn {
        background-color: #f17526;
        border: none;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 15px;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

</style>