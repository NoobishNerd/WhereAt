<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group">
        <select size="200" v-model="selectedTable" class="form-control" id="sltTables">
          <option v-for="table in tables" v-bind:key="table.id_table">Mesa {{table.id_table}} | {{table.capacity}} pessoas</option>
        </select>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="form-group">
        <input v-model="newTableCapacity" type="number" class="form-control" id="txtAddTable" aria-describedby="helpId" placeholder="Capacidade"
          min="0" />
      </div>
      <button @click="addTable" id="addButtontables">Adicionar Mesa</button>

      <button class="mt-4" @click="removeTable" id="removeButtontables">Remover Mesa</button>
    </div>
  </div>
</template>

<script>
import restaurantService from '../api/restaurants'
import swal from "sweetalert2";
export default {
  name: "TableEditor",
  data: () => ({
    tables: [],
    newTableCapacity: "",
    selectedTable: ""
  }),
  props: {
    restaurantId: {
      required: true
    }
  },

  created: async function () {
    this.tables = await restaurantService.getRestaurantTables(this.restaurantId);
  },


  methods: {
    async addTable() {
      if (this.newTableCapacity == "") {
        swal.fire("Mesas", "Escolha a capacidade da mesa!", "warning");
      } else {
        await restaurantService.addTable({
            capacity: this.newTableCapacity,
          },
          this.restaurantId
        );
        this.tables = await restaurantService.getRestaurantTables(this.restaurantId);
      }
    },


    async removeTable() {
      //vou ter de manipular bué o string
      let start = this.selectedTable.indexOf(" ") + 1
      let end = this.selectedTable.indexOf("|") - 1
      let removeId = parseInt(this.selectedTable.slice(start, end))

      await restaurantService.deleteTable(removeId);
      this.tables = await restaurantService.getRestaurantTables(this.restaurantId);
    },
  }
}
</script>
<style scoped>
#sltTables {
  height: 350px;
}

#addButtontables {
  background-color: #302f30;
  border: none;
  color: #ffffff;
  padding: 10px 60px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  -webkit-border-radius: 2px 2px 2px 2px;
  border-radius: 2px 2px 2px 2px;
  margin: 100px 0px 40px 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#removeButtontables {
  background-color: #302f30;
  border: none;
  color: #ffffff;
  padding: 10px 61px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  -webkit-border-radius: 2px 2px 2px 2px;
  border-radius: 2px 2px 2px 2px;
  margin: 70px 0px 40px 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
