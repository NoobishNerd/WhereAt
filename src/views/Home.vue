<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="img-wrapper">
            <img class="img-responsive" src="../assets/Nice Restaurant.png" />
            <div class="img-overlay">



            </div>
          </div>
        </div>
      </div>
      

      <br />

      <div class="row">
        <div class="col-sm-2"></div>
          <h4 class="text-left mr-5" id="recommendationText">Recomendações Where@</h4>       
                        <div id="searchBtn" class="span3 widget-span widget-type-raw_html custom-search d-flex mb-2 ml-5" style="" data-widget-type="raw_html"
                data-x="4" data-w="3">
                <div class="cell-wrapper layout-widget-wrapper">
                  <span id="hs_cos_wrapper_module_14308928327274411"
                    class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_raw_html" style=""
                    data-hs-cos-general-type="widget" data-hs-cos-type="raw_html">
                    <form v-on:submit.prevent="getSearchResults()" method="GET"
                      action="https://www.shopwithscrip.com/Search?" role="search"
                      class="navbar-form navbar-left ng-pristine ng-valid" id="express-form" novalidate="">
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
          <hr />
      </div>
      <div class="row">
        <div class="col-sm-2">
        </div>
        <div class="col-sm-8">
          <div id="windowCarrousel" 
            class="row text-center img-thumbnail img-fluid">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="4000">
              <ol class="carousel-indicators">
                <li v-for="restaurant in restaurants" v-bind:key="restaurant.id" data-target="#carouselExampleIndicators"
                  :data-slide-to="restaurant.id" :class="{ active: restaurant.id==0 }"></li>
              </ol>
              <div class="carousel-inner">

                <div class="carousel-item" v-for="restaurant in restaurants" v-bind:key="restaurant.id + restaurant.profilePic"
                  :class="{ active: restaurant.id==0 }">
                  <RestaurantCard :restaurant="restaurant"> </RestaurantCard>
                </div>

              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-sm-2">

        </div>
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-10">
              <RestaurantCard v-for="restaurant in restaurants" v-bind:restaurant="restaurant"
                v-bind:key="restaurant.id"></RestaurantCard>
            </div>
            <div class="col-sm-1">

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
      filterMaybe: "",
      restaurants: []
    }),

    created: function () {
      this.restaurants = this.$store.state.restaurants;
    },

    methods: {
      getSearchResults() {
        this.restaurants = this.$store.getters.getSearchResults(this.searchText)
        alert(JSON.stringify(this.restaurants))
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
    display: none;
    
  }

  input[type="search"] {
    -webkit-appearance: textfield;
  }
</style>