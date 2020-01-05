<template>
  <div class="about">
    <div class="row">
      <div class="col-6 text-center">
        <h5 class="pt-2">Mac Circunvalacao</h5>
        <img src="../assets/circunvalacao-9.jpg" />
      </div>
      <div class="col-6 text-center">
        <h5>Fotos do restaurante</h5>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
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
                class="d-block w-100"
                src="../assets/banana.jpg"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="../assets/circunvalacao-9.jpg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
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
    <div class="row">
      <div class="col-5">
        <h5>Número de Pessoas:</h5>
        <input type="number" />
        <br />
        <br />
        <input type="date" id="start" name="start" />
        <br />
        <br />
        <button>Reservar</button>
      </div>

      <div class="col-2">
        <h5>Mesas:</h5>
        <div class="form-group">
          <select multiple class="form-control" id="sltTables">
            <option>Mesa 1 | 3 pessoas</option>
            <option>Mesa 2 | 4 pessoas</option>
            <option>Mesa 3 | 3 pessoas</option>
          </select>
        </div>
      </div>
      <div class="col-5">
        <img src="../assets/googlemaps.jpg" alt="" />
        <br />
        <br />
        <button>Abrir em google maps</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    component: "info"
  }),

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

.carousel {
  margin: 0px 100px;
}

.row {
  margin-top: 50px;
}
</style>
