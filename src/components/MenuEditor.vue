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
                    <option value="1">Entradas</option>
                    <option value="2">Bebidas</option>
                    <option value="3">Pratos de Carne</option>
                    <option value="4">Pratos de Peixe</option>
                    <option value="5">Pratos Vegetarianos</option>
                    <option value="6">Sobremesas</option>
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
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 0"> <!-- Eu não queria nada usar esta resolução, mas é a unica forma de usar v-for várias vezes no mesmo array e na mesma página-->
                    <h6 style="color:black" v-if="menuItem.desc_categoria == 'Entradas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Bebidas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 1000">
                    <h6 style="color:black"  v-if="menuItem.desc_categoria == 'Bebidas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos de Carne</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 2000">
                    <h6 style="color:black"  v-if="menuItem.desc_categoria == 'Carne'">{{menuItem.desc_prato}} - {{menuItem.preco}}€
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos de Peixe</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 3000">
                    <h6  style="color:black" v-if="menuItem.desc_categoria == 'Peixe'">{{menuItem.desc_prato}} - {{menuItem.preco}}€
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Pratos Vegetarianos</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 4000">
                    <h6 style="color:black"  v-if="menuItem.desc_categoria == 'Vegetariano'">{{menuItem.desc_prato}} - {{menuItem.preco}}€
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button>
                    </h6>
                </div>

                <br>

                <h4>Sobremesas</h4>
                <hr>
                <div v-for="menuItem in menu" v-bind:key="menuItem.id_prato + 5000">
                    <h6 style="color:black"  v-if="menuItem.desc_categoria == 'Sobremesas'">{{menuItem.desc_prato}} - {{menuItem.preco}}€ 
                        <button @click="removeItem(menuItem.id_prato)" id="removeItemBtn" class="ml-2">X</button> 
                    </h6>
                </div>

                <br>
            </div>
        </div>
    </div>
</template>

<script>
import restaurantService from '../api/restaurants'
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

    created: async function () {
        this.menu = await restaurantService.getRestaurantMenu(this.restaurantId);
    },

    methods: {
        async addItem() {
            if (this.item == "" || this.itemType == "" || this.price == "") {
                alert("Preencha todos os campos")
            } else {
                await restaurantService.addDish({
                        preco: this.price,
                        desc_prato: this.item,
                        id_categoria: Number(this.itemType)
                    },
                    this.restaurantId
                );
            }
        },


        async removeItem(id) {
            await restaurantService.deleteDish(id);
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