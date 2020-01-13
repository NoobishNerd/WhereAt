<template>
  <div class="container border border-light rounded">
    <div class="row">
      <div id="windowPhoto" class="col-sm-5 text-center img-thumbnail">
        <h5 class="pt-2 font-weight-bold"></h5>
        <img
          id="fotoRestaurante"
          src="../assets/Hachiman Profile Pic 1.jpg"
          class="pb-2 img-fluid"
        />
      </div>
      <div class="col-1"></div>
      <div
        id="windowCarrousel"
        class="col-sm-6 text-center img-thumbnail img-fluid"
      >
        <h5 class="font-weight-bold">Fotos do restaurante</h5>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
          data-interval="4000"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100 img-fluid"
                src="../assets/banana.jpg"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 img-fluid"
                src="../assets/circunvalacao-9.jpg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 img-fluid"
                src="../assets/banana.jpg"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div class="row ">
      <div id="windowReservation" class="col-sm-6 img-thumbnail">
        <div class="row">
          <div class="col-sm-5">
            <h5>Número de Pessoas:</h5>
            <input type="number" />
            <br />
            <br />
            <input type="date" id="start" name="start" />
            <br />
            <br />
            <button id="smallerButton">Reservar</button>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-5">
            <h5>Mesas:</h5>
            <div class="form-group">
              <select multiple class="form-control" id="sltTables">
                <option>Mesa 1 | 3 pessoas</option>
                <option>Mesa 2 | 4 pessoas</option>
                <option>Mesa 3 | 3 pessoas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-1"></div>
      <div class="col-sm-5 ">
        <img src="../assets/ze.png" alt="" />
      </div>
    </div>
    <br />

    <div id="finalCrate" class="row d-flex" style="border:1px solid black;">
      <div class="col-sm-3 pt-3" style="border-bottom:1px solid black;">
        <h5 class="font-weight-bold">Ementa</h5>
      </div>
      <div
        class="col-sm-3 pt-3"
        style="border-bottom:1px solid black; border-left:1px solid black;"
      >
        <h5 class="font-weight-bold">Promoções</h5>
      </div>
      <div
        id="comentary"
        class="col-sm-3 pt-3 font-weight-bold "
        style="border-bottom:1px solid black; border-left:1px solid black;"
      >
        <h5 class="font-weight-bold">Comentários</h5>
      </div>
      <div class="col-sm-1" style="border-left:1px solid black;"></div>
      <div
        id="information"
        class="col-sm-2 pt-2 "
        style="border-bottom:1px solid black; border-left:1px solid black;"
      >
        <h1 class="font-weight-bold">i</h1>
      </div>
      Ementa do Restaurante: Recomendações Do Chef: Bacalhau Lascado Especial –
      prato de eleição dos clientes da casa 15,5 € um delicioso bacalhau assado
      na brasa com batatas assadas “a murro” Bacalhau à Brás 13,8 € um clássico
      na gastronomia portuguesa confeccionado com bacalhau de alta qualidade,
      acompanha com salada Pataniscas de Bacalhau 14,2 € cozinhadas com
      saborosas lascas de bacalhau, servidas com arroz de feijão ou arroz de
      tomate Preço médio 25 €
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    component: "info",
    restaurant: {
      username: "jk"
    }
  }),

  created: function() {
    this.restaurant = this.$store.getters.getRestaurantById(
      this.$route.params.id
    );
  },

  methods: {
    call(newComponent) {
      this.component = newComponent;
    }
  }
  /*
    components: {
    ClientInfo,
    ClientHistory
  }*/
};
</script>

<style scoped>
img {
  height: 300px;
  width: auto;
}
.row {
  margin-top: 50px;
}

html * {
  color: #966227;
}
#smallerButton {
  background-color: #e3b814;
  border: none;
  color: #af2831;
  padding: 10px 45px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 10px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#mapsButton {
  background-color: #e3b814;
  border: none;
  color: #af2831;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 30px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
#fotoRestaurante {
  width: 400px;
  border-color: white;
  height: 300px;
}
#windowPhoto {
  border-color: white;
  box-shadow: 0 30px 60px 15px rgba(0, 0, 0, 0.1);
}
#windowCarrousel {
  box-shadow: 0 30px 60px 15px rgba(0, 0, 0, 0.1);
}
#windowReservation {
  border-color: white;
  box-shadow: 0 30px 60px 15px rgba(0, 0, 0, 0.1);
}
#finalCrate {
  border-radius: 10px 10px 0px 0px;
}
.container {
  -webkit-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.75);
}
.border-primary {
  border-width: 3px;
}
</style>
