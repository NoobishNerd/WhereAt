<template>
    <div class="adminAuth">
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <div class="row">
                <div class="card-group" style="width: 30rem; cursor:pointer">
                    <div class="container-fluid">
                        <div class="card img-thumbnail">
                            <img class="card-img-top img-fluid" style="height: 20vw; object-fit: cover"
                                :src="restaurant.profilePic" alt="Card image cap" />
                            <div class="card-body">
                                <h6 class="card-title text-left">{{restaurant.local}}</h6>
                                <h4 class="card-title text-left font-weight-bold" id="restaurantCardName">
                                    {{restaurant.username}}</h4>
                                <h1 v-if="restaurant.approval==true">Aprovado</h1>
                                <h1 v-if="restaurant.approval==false" >Não Ativado</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <button @click="manageRestaurantApproval(restaurant.id, restaurant.approval, true)" :class="{ btnEnabled: restaurant.approval==false , btnDisabled: restaurant.approval==true}">Aprovar</button>
                    
                </div>
                <div class="col-sm-6">
                    <button @click="manageRestaurantApproval(restaurant.id, restaurant.approval, false)"  :class="{ btnEnabled: restaurant.approval==true, btnDisabled: restaurant.approval==false }" >Suspender</button>
                </div>
            </div>

        </div>


    </div>
</template>
<script>

export default {
    data: () => ({
      
      restaurants: []
    }),
    created: function () {
      this.restaurants = this.$store.state.restaurants;
      
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
        background-color: green;
        color: black;
    }

    .btnDisabled{
        background-color: red;
        color: black;
    }
</style>