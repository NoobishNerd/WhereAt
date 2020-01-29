<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h4 class="mt-4">Entradas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 0">
                    <!-- Eu não queria nada usar esta resolução, mas é a unica forma de usar v-for várias vezes no mesmo array e na mesma página-->
                    <h6 v-if="menuItem.itemType == 'Entradas'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4>Bebidas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 1000">
                    <h6 v-if="menuItem.itemType == 'Bebidas'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4>Pratos de Carne</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 2000">
                    <h6 v-if="menuItem.itemType == 'Carne'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4>Pratos de Peixe</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 3000">
                    <h6 v-if="menuItem.itemType == 'Peixe'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4>Pratos Vegetarianos</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 4000">
                    <h6 v-if="menuItem.itemType == 'Vegetariano'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>

                <h4>Sobremesas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 5000">
                    <h6 v-if="menuItem.itemType == 'Sobremesas'">{{menuItem.item}} - {{menuItem.price}}€</h6>
                </div>

                <br>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuEditor",
        data: () => ({
            menu: [],
        }),
        props: {
            restaurant: {
                type: Object,
                required: true
            }
        },
    }
</script>