<template>
  <div class="info">
    <br />
    <br />
    <div class="row">
      <div class="col-sm-12">
        <h5 id="boldText">Nome</h5>
        <input class="rale" type="text" placeholder="Rui Gonçalves"/>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <h5 id="boldText">Telemóvel</h5>
        <input class="rale" type="text" placeholder="914206969"/>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <h5 id="boldText">Email</h5>
        <input class="rale" type="text" placeholder="querofalecer@gmail.com" />
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-sm-8"></div>
      <div class="col-sm-4">
        <button id="smallerButton">Guardar Alterações</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
#boldText{
  font-style: "Raleway";
  font-weight: bold;
}

.rale{
  font-style: "Raleway"
}

#smallerButton {
  background-color: #F17526;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 0px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>