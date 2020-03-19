<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 px-0">

            <img class="img-responsive" src="../assets/restaurante.png" />
            <div class="img-overlay">



            </div>

        </div>
      </div>


      <br />

      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-8">
        <div class="row">
        <div class="col-sm-4">
        <div v-if="recommendation != 'undefined'" >
          <h4 class="text-left pb-2" id="recommendationText">Recomendações para Si</h4>                  
          <RestaurantCard v-for="restaurant in recommendation" v-bind:key="restaurant.id + 'star'" v-bind:restaurant="restaurant"></RestaurantCard>
        </div>


        </div>
        <div id="searchBtn" class="span3 widget-span widget-type-raw_html custom-search d-flex" style=""
          data-widget-type="raw_html" data-x="4" data-w="3">
          <div class="cell-wrapper layout-widget-wrapper">
            <span id="hs_cos_wrapper_module_14308928327274411"
              class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_raw_html" style=""
              data-hs-cos-general-type="widget" data-hs-cos-type="raw_html">
              <form v-on:submit.prevent="getSearchResults()" method="GET" action="https://www.shopwithscrip.com/Search?"
                role="search" class="navbar-form navbar-left ng-pristine ng-valid" id="express-form" novalidate="">
                <input v-model="searchText" required="" name="q" id="express-form-typeahead" placeholder="Search"
                  class="form-control tt-input" autocomplete="off" spellcheck="false" dir="auto" type="text" />
                <button class="search-btn" type="submit">
                  <span class="icon"></span>
                </button>
              </form>
            </span>
          </div>
          <!--end layout-widget-wrapper -->
        </div>
        <div>
          <select v-model="filter" id="filterSlt" class="form-control">
            <option v-for="item in filters" v-bind:key="item" :value="item">{{item}}</option>
          </select>
        </div>
        </div>
        <hr class="mt-1">
        </div>
      </div>


      <div class="row">
        <div class="col-sm-2">

        </div>
        <div class="col-sm-8">
          <h4 class="text-left pb-2" id="recommendationText">Restaurantes Portugal</h4>
          <div class="row" >
            <div class="col-sm-5">
              <RestaurantCard v-for="restaurant in leftRestaurants" v-bind:key="restaurant.id" v-bind:restaurant="restaurant"></RestaurantCard>
            </div>
            <div class="col-sm-2">
            </div>
            <div class="col-sm-5">
              <RestaurantCard v-for="restaurant in rightRestaurants" v-bind:key="restaurant.id" v-bind:restaurant="restaurant" ></RestaurantCard>
            </div>

          </div>


        </div>
        <div class="col-sm-2">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import RestaurantCard from "@/components/RestaurantCard.vue";

  export default {
    name: "home",

    data: () => ({
      searchText: "",
      filter: "",
      filters: [],
      leftRestaurants: [],
      rightRestaurants: [],
      restaurants: [],
      recommendation: "undefined"
    }),

    created: function () {
      this.restaurants = this.$store.state.restaurants;
      let distinctFilters = [""]
      this.$store.state.restaurants.forEach(restaurant => {
          for (const tag of restaurant.tags) {
            if(!(distinctFilters.find(filter => filter.toLowerCase().includes(tag.tag_name.toLowerCase())))){
              distinctFilters.push(tag.tag_name)
            }
          }
          
      });
      this.filters = distinctFilters
      
    },

    mounted: function(){

      this.separateLeftAndRight()
      this.getRecommendation()
    },

    methods: {
      getSearchResults() {
        this.restaurants = this.$store.getters.getSearchResults(this.searchText, this.filter)
        
        this.separateLeftAndRight()
      },
      filterApproved(){
        return this.restaurants.filter(restaurant => restaurant.approval === true)
      },
      separateLeftAndRight(){
        this.restaurants = this.filterApproved()

        this.leftRestaurants = []
        this.rightRestaurants = []
        //já n podemos usar os ids para separar por isso contamos
        let restaurantCount = 0
        for (const restaurant of this.restaurants) {
          if (restaurantCount%2 == 0) {
            this.leftRestaurants.push(restaurant)
          }else{
            this.rightRestaurants.push(restaurant)
          }
          restaurantCount++
        }
      },
      getRecommendation(){
        if(this.$store.state.logged != false){
          let preferences = this.$store.getters.getLoggedUser.preferences
          let recommendationTemp = [];
          
          for (let restaurant of this.restaurants) {
              //por agora escolhe o restaurante mais avaliado ao invés de tudo que tenha uma tag preferida
              if(Math.max.apply(Math, this.restaurants.map(function(o) { return o.comments.length; }))){
                for (let i = 0; i < restaurant.tags.length; i++) {
                  for (let j = 0; j < preferences.length; j++) {
                   if (preferences[j].tag_name ==  restaurant.tags[i].tag_name) {
                     recommendationTemp.push(restaurant.id)
                   } 
                  }
                }
              }             
          }
          //filter unique ids
          recommendationTemp = recommendationTemp.filter(function (value, index, self) { 
              return self.indexOf(value) === index;
          })
          
          if(recommendationTemp.length != 0){
            this.recommendation = []
            for (let i = 0; i < recommendationTemp.length; i++) {
              for (let restaurant of this.restaurants) {
                if(restaurant.id == recommendationTemp[i]){ this.recommendation.push(restaurant)}
              }  
            }
          }
          
          
        }else{
          this.recommendation = "undefined"
        }
      }
    },

    components: {
      RestaurantCard
    }
  };
</script>

<style>
  #recommendationText {
    font-family: "Raleway";
    font-weight: bold;
    color: #966227;
  }

  .img-wrapper {
    position: relative;
  }

  .img-responsive {
    width: 100%;
    height: auto;
  }

  .img-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }

  .img-overlay:before {
    content: " ";
    display: block;
    /* adjust 'height' to position overlay content vertically */
    height: 30%;
  }

  #jumboBtn {
    /* matches 'btn-md' */
    width: 15%;
    height: 16%;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 43px;
    color: #966227;
    background-color: white;
    line-height: 120%;
    border-style: solid;
    border-width: 3px;
    border-color: black;
    border-radius: 15px;
  }

  @media (max-width: 760px) {

    /* matches 'btn-xs' */
    .btn-responsive {
      padding: 1px 5px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 3px;
    }
  }



  #express-form-typeahead {
    background-color: transparent;
    background-image: url(../assets/main_lupa.png);
    background-position: 5px center;
    background-repeat: no-repeat;
    background-size: 40px 40px;
    border: none;
    cursor: pointer;
    height: 40px;
    margin: -4px 0;

    padding: 0 0 0 42px;
    -webkit-transition: width 400ms ease, background 400ms ease;
    transition: width 400ms ease, background 400ms ease;
    width: 0;
    box-shadow: none;
  }

  #express-form-typeahead:focus {
    background-color: #fff;
    border: 2px solid black;
    align-items: center;
    cursor: text;
    outline: 0;
    width: 230px;
  }

  .search-btn {
    align-items: right;
    display: none;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
  }
</style>