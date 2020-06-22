<template>
    <div class="adminAuth">
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id_restaurante">
            <div class="row">
                <div class="card-group" style="width: 30rem; cursor:pointer">
                    <div class="container-fluid">
                        <div class="card img-thumbnail">
                            <img class="card-img-top img-fluid" style="height: 20vw; object-fit: cover"
                                :src="restaurant.foto_perfil" alt="Card image cap" />
                            <div class="card-body">
                                <h6 class="card-title text-left">{{restaurant.localidade}}</h6>
                                <h4 class="card-title text-left font-weight-bold" id="restaurantCardName">
                                    {{restaurant.nome}}</h4>
                                <h1 v-if="restaurant.aprovacao==true">Aprovado</h1>
                                <h1 v-if="restaurant.aprovacao==false" >Não Ativado</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <button @click="manageRestaurantApproval(restaurant.id_restaurante, restaurant.aprovacao, true)" :class="{ btnEnabled: restaurant.approval==false , btnDisabled: restaurant.approval==true}">Aprovar</button>
                    <button @click="manageRestaurantApproval(restaurant.id_restaurante, restaurant.aprovacao, false)"  :class="{ btnEnabled: restaurant.approval==true, btnDisabled: restaurant.approval==false }" >Suspender</button>
                </div>
            </div>

        </div>


    </div>
</template>
<script>
import restaurantService from '../api/restaurants.js';

export default {
    data: () => ({
      
      restaurants: []
    }),
    created: async function () {
      this.restaurant = await restaurantService.getAllRestaurants();
    },

    updated: async function () {
      this.restaurant = await restaurantService.getAllRestaurants();
    },
    methods:{
        manageRestaurantApproval(restaurantId, currentValue, newValue){
            if(currentValue != newValue){
                this.$store.commit("CHANGE_APPROVAL", {
                    id: restaurantId,
                    value: newValue
                })
            }
        }
    }
}
</script>
<style >
    .btnEnabled{
        background-color: red;
        color: black;
    }

    .btnDisabled{
        background-color: green;
        color: black;
    }
    .adminAuth{
        align-items: center;
        margin: auto;
    }
</style>