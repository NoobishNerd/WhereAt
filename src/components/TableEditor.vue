<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group">
        <select multiple class="form-control" id="sltTables">
          <option>Mesa 1 | 3 pessoas</option>
          <option>Mesa 2 | 4 pessoas</option>
          <option>Mesa 3 | 3 pessoas</option>
        </select>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="form-group">
        <input type="number" class="form-control" id="txtAddTable" aria-describedby="helpId" placeholder="Capacidade"
          min="0" />
      </div>
      <button @click="addTable" id="addButtontables">Adicionar Mesa</button>

      <button id="removeButtontables">Remover Mesa</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableEditor",
  data: () => ({
    tables: []
  }),
  methods: {
    addTable() {
      document.getElementById("txtAddTable").value;
    }
  }
};
</script>
<style scoped>
#sltTables {
  height: 350px;
}

#addButtontables {
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
  margin: 100px 0px 40px 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#removeButtontables {
  background-color: #f17526;
  border: none;
  color: #ffffff;
  padding: 10px 68px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 70px 0px 40px 0px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
