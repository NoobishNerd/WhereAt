<template>
    <div class="container-fluid">
        <div class="row pt-2">
            <div class="col-sm-3">
                <label for="itemTxt">Item</label>
                <input v-model="item" type="text" class="form-control" id="itemTxt">
            </div>
            <div class="col-sm-3">
                <label for="itemTypeSlt">Tipo do Item</label>
                <select v-model="itemType" id="itemTypeSlt" class="form-control">
                    <option value="Entradas">Entradas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Carne">Pratos de Carne</option>
                    <option value="Peixe">Pratos de Peixe</option>
                    <option value="Vegetariano">Pratos Vegetarianos</option>
                    <option value="Sobremesas">Sobremesas</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label for="itemPriceTxt">Preço</label>
                <div class="input-group-append">
                    <input v-model="price" step="any" type="text" class="form-control" id="itemPriceTxt" placeholder="0.00">
                    <span class="input-group-text">€</span>
                </div>
            </div>

            <div class="col-sm-3 text-center">
                <button @click="addItem" class="mt-4 py-3" id="addItemBtn">Adicionar</button>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-12">
                <h4>Entradas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 0"> <!-- Eu não queria nada usar esta resolução, mas é a unica forma de usar v-for várias vezes no mesmo array e na mesma página-->
                    <h6 v-if="menuItem.itemType == 'Entradas'">{{menuItem.item}} - {{menuItem.price}}€
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Bebidas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 1000">
                    <h6 v-if="menuItem.itemType == 'Bebidas'">{{menuItem.item}} - {{menuItem.price}}€
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos de Carne</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 2000">
                    <h6 v-if="menuItem.itemType == 'Carne'">{{menuItem.item}} - {{menuItem.price}}€
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos de Peixe</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 3000">
                    <h6 v-if="menuItem.itemType == 'Peixe'">{{menuItem.item}} - {{menuItem.price}}€
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos Vegetarianos</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 4000">
                    <h6 v-if="menuItem.itemType == 'Vegetariano'">{{menuItem.item}} - {{menuItem.price}}€
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Sobremesas</h4>
                <hr>
                <div v-for="menuItem in restaurant.menu" v-bind:key="menuItem.id + 5000">
                    <h6 v-if="menuItem.itemType == 'Sobremesas'">{{menuItem.item}} - {{menuItem.price}}€ 
                        <button @click="removeItem(menuItem.id)" id="removeItemBtn" class="ml-2">X</button> 
                    </h6>
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
            item: "",
            itemType: "",
            price: "",
        }),
        props: {
            restaurant: {
                type: Object,
                required: true
            }
        },

        methods: {
            addItem() {
                if (this.item == "" || this.itemType == "" || this.price == "") {
                    alert("Preencha todos os campos")
                } else {
                    this.$store.commit("ADD_ITEM", {
                        id: this.getLastItemId(),
                        item: this.item,
                        itemType: this.itemType,
                        price: this.price,
                        restaurantId: this.restaurant.id
                    })
                }
            },

            getLastItemId() {
                if (this.restaurant.menu.length != 0) {
                    return this.restaurant.menu[this.restaurant.menu.length - 1].id + 1;
                } else {
                    return 0;
                }
            },

            removeItem(id){
                this.$store.commit("REMOVE_ITEM",{
                    id: id,
                    restaurantId: this.restaurant.id
                })
            }
        }
    }
</script>

<style scoped>
    #addItemBtn {
        background-color: #f17526;
        border: none;
        color: #ffffff;
        padding: 10px 60px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }
    #removeItemBtn {
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