<template>
  <div class="history container">
    <br>
    <div id="historyRow" class="row mb-3 mr-1 mt-2">
      <div class="col-sm-8" style="border-right:2px solid">
        <p class="text-left pt-2">Terça-feira, 3 de Novembro de 2019</p>
        <h5 class="text-left pl-4 mb-0" id="brownBoldText">Restaurante Bananeira</h5>
        <p class="text-left pl-4 pt-0">Porto</p>
        <br>
      </div>
      <div class="col-sm-4" style="background-color:#F17526">
        <div class="row">
          <div class="col-sm-3">

          </div>
          <div class="col-sm-9">
            <p class="text-left pt-4 mb-2" id="whiteText">Ver reserva</p>
            <p class="text-left mb-2" id="whiteText">Remover da lista</p>
            <p class="text-left mb-2" id="whiteText">Reservar novamente</p>
          </div>
        </div>
      </div>
    </div>

    <div id="historyRow" class="row mb-3 mr-1">
      <div class="col-sm-8" style="border-right:2px solid">
        <p class="text-left pt-2">Terça-feira, 3 de Novembro de 2019</p>
        <h5 class="text-left pl-4 mb-0" id="brownBoldText">Restaurante Bananeira</h5>
        <p class="text-left pl-4 pt-0">Porto</p>
        <br>
      </div>
      <div class="col-sm-4" style="background-color:#F17526">
        <div class="row">
          <div class="col-sm-3">

          </div>
          <div class="col-sm-9">
            <p class="text-left pt-4 mb-2" id="whiteText">Ver reserva</p>
            <p class="text-left mb-2" id="whiteText">Remover da lista</p>
            <p class="text-left mb-2" id="whiteText">Reservar novamente</p>
          </div>
        </div>
      </div>      
    </div>

    <div id="historyRow" class="row mb-3 mr-1">
      <div class="col-sm-8" style="border-right:2px solid">
        <p class="text-left pt-2">Terça-feira, 3 de Novembro de 2019</p>
        <h5 class="text-left pl-4 mb-0" id="brownBoldText">Restaurante Bananeira</h5>
        <p class="text-left pl-4 pt-0">Porto</p>
        <br>
      </div>
      <div class="col-sm-4" style="background-color:#F17526">
        <div class="row">
          <div class="col-sm-3">

          </div>
          <div class="col-sm-9">
            <p class="text-left pt-4 mb-2" id="whiteText">Ver reserva</p>
            <p class="text-left mb-2" id="whiteText">Remover da lista</p>
            <p class="text-left mb-2" id="whiteText">Reservar novamente</p>
          </div>
        </div>
      </div>
    </div>

    <br>

  </div>
</template>

<script>
export default {
  props:{
    id: String
  }
};
</script>

<style lang="stylus" scoped>
#historyRow{
  border-style: solid;
  border-width: 2px
}

#brownBoldText{
  color: #F17526;
  font-family: "Raleway";
  font-weight: bold;
}

#brownText{
  color: #F17526;
  font-family: "Raleway";
}

#whiteText{
  color: white;
  font-family: "Raleway";
  font-weight: bold;
  cursor:pointer
}

</style>
