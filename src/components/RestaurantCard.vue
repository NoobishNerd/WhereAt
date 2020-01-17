<template>
  <div class="card-group" style="width: 30rem">
    <div class="container-fluid">
      <div class="card img-thumbnail">
        <img class="card-img-top img-fluid" style="height: 20vw; object-fit: cover" :src="restaurant.profilePic" alt="Card image cap" @click="routerLink" />
        <div class="card-body">
          <h6 class="card-title text-left">{{restaurant.local}}</h6>
          <h4 class="card-title text-left font-weight-bold">
           {{restaurant.username}}
          </h4>
          <p class="card-text text-left">
            <small>
              Preço médio:25€
            </small>
          </p>
          <p class="card-text text-left">
            <small>{{rate}}-{{num_comments}} avaliações</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",

  data: () => ({
    rate: 0,
    num_comments: 0,
  }),

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
    },

    getAverageAndNumber(){
      //counting number of comments and sum of ratings
       for (let i = 0; i < this.restaurant.comments.length; i++) {this.num_comments++; this.rate+= this.comments[i].rate}
      //average de ratings
      this.rate = this.rate/this.num_comments
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
  margin-top: 5px;
}
.card {

  border-width: 1px;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);

  padding-top: 3px;
}
.container-fluid {
  padding: 0px;
}
p {
  color: #f17526;
  margin: 0px;
}
h6 {
  color: #f17526;
  margin: 0px;
}
h4 {
  margin: 0px;
}
</style>
