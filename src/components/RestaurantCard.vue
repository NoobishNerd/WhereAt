<template>
  <div class="card-group">
    <div class="container-fluid">
      <div class="card">
        <img
          class="card-img-top img-fluid"
          src="../assets/banana.jpg"
          alt="Card image cap"
          @click="routerLink"
        />
        <div class="card-body">
          <h6 class="card-title text-left">Cozinha Gourmet</h6>
          <h4 class="card-title text-left font-weight-bold">
            Screaming Bananas
          </h4>
          <p class="card-text text-left">
            <small>
              Preço médio:25€
            </small>
          </p>
          <p class="card-text text-left">
            <small>4.5-4012 avaliações</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",

  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  //COMO FAÇO ISTO EM ROUTER-LINK TO=""???
  methods: {
    routerLink() {
      this.$router.push({
        name: "aboutRestaurant",
        params: { id: this.restaurant.id }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-group {
  padding-bottom: 40px;
  font-family: "Raleway";
}
.card-body {
  padding: 0px;
  word-spacing: 1px;
}
.card {
  border: none;
}
.container-fluid {
  padding: 0px;
}
p {
  color: #f17526;
  margin:0px;
}
h6 {
  color: #f17526;
  margin: 0px;
}
h4{
  margin:0px;
}
</style>
