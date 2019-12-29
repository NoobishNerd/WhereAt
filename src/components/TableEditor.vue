<template>
<div class="container">
<div class="row">
    <div class="col-sm-1">
    </div>
    
    <div class="col-sm-4">
        <div class="form-group">
          <select multiple class="form-control" id="sltTables">
            <option>Mesa 1 | 3 pessoas</option>
            <option>Mesa 2 | 4 pessoas</option>
            <option>Mesa 3 | 3 pessoas</option>
          </select>
        </div>
    </div>

    <div class="col-sm-2">
        <div class="form-group">
          <input type="number"
            class="form-control" id="txtAddTable" aria-describedby="helpId" placeholder="Capacidade" min="0">
        </div>
        <button @click="addTable">Adicionar Mesa</button>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <button>Remover Mesa</button>
    </div>

    <div class="col-sm-5">
    </div>
</div>
</div>
</template>

<script>
export default {
  name: "TableEditor",
  data: () => ({
      tables:[]
  }),
  methods: {
      addTable(){
          document.getElementById("txtAddTable").value
      }
  }
  }
</script>