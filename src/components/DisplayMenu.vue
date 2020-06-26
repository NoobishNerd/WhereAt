<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="mt-4" style="color:#f17526">Entradas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 0">
                    <!-- Eu não queria nada usar esta resolução, mas é a unica forma de usar v-for várias vezes no mesmo array e na mesma página-->
                    <h6 v-if="menuItem.category == 'Entradas'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Bebidas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 1000">
                    <h6 v-if="menuItem.category == 'Bebidas'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos de Carne</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 2000">
                    <h6 v-if="menuItem.category == 'Pratos de Carne'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos de Peixe</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 3000">
                    <h6 v-if="menuItem.category == 'Pratos de Peixe'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos Vegetarianos</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 4000">
                    <h6 v-if="menuItem.category == 'Pratos Vegetarianos'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Sobremesas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_dish + 5000">
                    <h6 v-if="menuItem.category == 'Sobremesas'">{{menuItem.dish_name}} - {{menuItem.price}}€</h6>
                </div>

                <br>
            </div>
        </div>
    </div>
</template>

<script>
import restaurantService from '../api/restaurants.js';

export default {
    name: "MenuEditor",
    data: () => ({
        menu: []
    }),
    created: async function () {
        this.menu = await restaurantService.getRestaurantMenu(this.restaurantId);
    },
    props: {
        restaurantId: {
            required: true
        }
    },
}
</script>