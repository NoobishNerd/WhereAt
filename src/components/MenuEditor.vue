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
                <div class="input-group-prepend">
                    <label for="itemPriceTxt">Preço</label>
                    <input v-model="price" step="any" type="text" class="form-control" id="itemPriceTxt">
            </div>

            <div class="col-sm-3 text-center">
                <button @click="addItem" class="mt-4 py-3" id="addItemBtn">Adicionar</button>    
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-12">
                <h3>Entradas</h3>
                <hr>
                <!-- v-for com todos os pratos -->
                <br>
                <h3>Bebidas</h3>
                <hr>
                <!-- v-for com todos os pratos -->
                <br>
                <h3>Pratos de Carne</h3>
                <hr>
                <!-- v-for com todos os pratos -->
                <br>
                <h3>Pratos de Peixe</h3>
                <hr>
                <!-- v-for com todos os pratos -->
                <br>
                <h3>Pratos Vegetarianos</h3>
                <hr>
                <!-- v-for com todos os pratos -->
                <br>
                <h3>Sobremesas</h3>
                <hr>
                <!-- v-for com todos os pratos -->
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
  props:{
    restaurant:{
      type: Object,
      required: true
    }
  },

  methods: {
      addItem(){
          if (this.item == "" || this.itemType == "" || this.price == ""){
              alert("Preencha todos os campos")
          }
          else {
            this.$store.commit("ADD_ITEM", {
            id: this.getLastItemId(),
            item: this.item,
            itemType: this.itemType,
            price: this.price,
            restaurantId:this.restaurant.id
            })
          }
      },
      getLastItemId(){
        if (this.restaurant.menu.length != 0) {
        return this.restaurant.menu[this.restaurant.menu.length - 1].id;
      } else {
        return 0;
      }
    },

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

</style>