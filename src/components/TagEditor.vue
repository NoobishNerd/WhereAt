<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <label class="mt-2" for="principalTagSlt">Escolher tag principal</label>
                <select v-model="newPrincipalTag" id="principalTagSlt" class="form-control">
                    <option v-for="tag in restaurant.tags" v-bind:key="tag.id" :value="tag.id">{{tag.tag_name}}</option>
                </select>
            </div>
            <div class="col-sm-2 mt-3">
                <button @click="changePrincipalTag()" id="changePrincipalBtn" class="mt-4 px-3 py-2">Salvar</button>
            </div>
        </div>        

        <h4 class="mt-3">Categorias do restaurante</h4>
        <hr>
        <div class="row">
            <div class="col-sm-2" v-for="tag in restaurant.tags" v-bind:key="tag.id + 1000">                        
                <p v-if="tag.principal == true" class="text-center principal" style="color: white;">{{tag.tag_name}}</p>
                <p v-if="tag.principal == false" class="text-center side">{{tag.tag_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TagEditor",
    data: () => ({
        newPrincipalTag: ""
    }),
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },

    methods: {
        changePrincipalTag(){
            this.$store.commit("CHANGE_PRINCIPAL_TAG", {
                tagId: this.newPrincipalTag,
                restaurantId: this.restaurant.id
            })
        }
    }
}
</script>

<style scoped>
.principal {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;
  border-radius: 40px 40px 40px 40px;
  background-color: #f17526;
}
.side {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;    
  border-radius: 40px 40px 40px 40px;  
}
#changePrincipalBtn {
    background-color: #f17526;
    border: none;
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

</style>