<template>
    <div class="adminAuth">
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id_restaurant">
            <div class="row">
                <div class="card-group" style="width: 30rem; cursor:pointer">
                    <div class="container-fluid">
                        <div class="card img-thumbnail">
                            <img class="card-img-top img-fluid" style="height: 20vw; object-fit: cover"
                                :src="restaurant.profilePic" alt="Card image cap" />
                            <div class="card-body">
                                <h6 class="card-title text-left">{{restaurant.local}}</h6>
                                <h4 class="card-title text-left font-weight-bold" id="restaurantCardName">
                                    {{restaurant.name}}</h4>
                                <h1 v-if="restaurant.approval==true">Aprovado</h1>
                                <h1 v-if="restaurant.approval==false" >Não Ativado</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <button @click="manageRestaurantApproval(restaurant.id_restaurant, restaurant.approval, true)" :class="{ btnEnabled: restaurant.approval==false , btnDisabled: restaurant.approval==true}">Aprovar</button>
                    <button @click="manageRestaurantApproval(restaurant.id_restaurant, restaurant.approval, false)"  :class="{ btnEnabled: restaurant.approval==true, btnDisabled: restaurant.approval==false }" >Suspender</button>
                </div>
            </div>

        </div>


    </div>
</template>
<script>
import restaurantService from '../api/restaurants.js';
import usersService from '../api/users';

export default {
    data: () => ({
        restaurants: []
    }),
    created: async function () {
        this.restaurants = await restaurantService.getAllRestaurants();
    },

    methods: {
        async manageRestaurantApproval(restaurantId, currentValue, newValue) {
            if (currentValue != newValue) {
                let restaurant = await usersService.getRestaurantById(restaurantId);
                
                await usersService.updateRestaurant({
                    profilePic: restaurant.profilePic,
                    info: restaurant.info,
                    approval: newValue,
                    availability: restaurant.availability
                }, restaurantId);

                this.restaurants = await restaurantService.getAllRestaurants();
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