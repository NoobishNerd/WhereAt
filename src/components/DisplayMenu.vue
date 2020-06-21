<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="mt-4" style="color:#f17526">Entradas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 0">
                    <!-- Eu não queria nada usar esta resolução, mas é a unica forma de usar v-for várias vezes no mesmo array e na mesma página-->
                    <h6 v-if="menuItem.desc_categoria == 'Entradas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Bebidas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id + 1000">
                    <h6 v-if="menuItem.desc_categoria == 'Bebidas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos de Carne</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id + 2000">
                    <h6 v-if="menuItem.desc_categoria == 'Pratos de Carne'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos de Peixe</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id + 3000">
                    <h6 v-if="menuItem.desc_categoria == 'Pratos de Peixe'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Pratos Vegetarianos</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id + 4000">
                    <h6 v-if="menuItem.desc_categoria == 'Pratos Vegetarianos'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
                </div>

                <br>

                <h4 style="color:#f17526">Sobremesas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id + 5000">
                    <h6 v-if="menuItem.desc_categoria == 'Sobremesas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€</h6>
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
        created: async function() {
            this.menu = await restaurantService.getRestaurantMenu(this.restaurantId);
            // eslint-disable-next-line no-console
            console.log(this.menu)
            // eslint-disable-next-line no-console
            console.log(this.restaurantId)
  },
        props: {
            restaurantId: {
                required: true
            }
        },
    }
    
</script>