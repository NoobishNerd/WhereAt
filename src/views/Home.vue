<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 px-0">
          <img class="img-responsive" src="../assets/restaurante.png" />
          <div class="img-overlay"></div>
        </div>
      </div>

      <br />

      <div class="restaurants">
        <div class="filterPos">
          <span class="" id="recommendationText">
            Restaurantes Portugal
          </span>
          <div id="searchBtn" class="">
            <span
              id="hs_cos_wrapper_module_14308928327274411"
              class=""
              style=""
              data-hs-cos-general-type="widget"
              data-hs-cos-type="raw_html"
            >
              <form
                v-on:submit.prevent="getSearchResults()"
                method="GET"
                action="https://www.shopwithscrip.com/Search?"
                role="search"
                class=""
                id="express-form"
                novalidate=""
              >
                <input
                  v-model="searchText"
                  required=""
                  name="q"
                  id="express-form-typeahead"
                  placeholder="Search"
                  class=""
                  autocomplete="off"
                  spellcheck="false"
                  dir="auto"
                  type="text"
                />
              </form>
            </span>
          </div>
          <select v-model="filter" id="filterSlt">
            <option
              v-for="item in filters"
              v-bind:key="item.id_tag"
              :value="item.tag_name"
              >{{ item.tag_name }}</option
            >
          </select>
        </div>
        <div class="separator"></div>
        <div class="cards">
          <ul>
            <li
              v-for="restaurant in restaurants"
              v-bind:key="restaurant.id_restaurant"
            >
              <RestaurantCard :restaurant="restaurant"></RestaurantCard>
            </li>
          </ul>
        </div>
      </div>

      <div class="restaurantsRec">
        <div v-if="recommendation != 'undefined'">
          <span class="text-left pb-2" id="recommendationText">
            Recomendações para Si
          </span>
          <div class="separator"></div>
          <div class="cardsRec">
            <ul>
              <li
                v-for="restaurant in recommendation"
                v-bind:key="restaurant.id_restaurant + 'star'"
              >
                <RestaurantCard v-bind:restaurant="restaurant"></RestaurantCard>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RestaurantCard from "@/components/RestaurantCard.vue";
import restaurantService from "../api/restaurants";
import bookingService from "../api/booking";
import usersService from "../api/users";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",

  data: () => ({
    searchText: "",
    preferences: [],
    filter: "",
    filters: [],
    restaurantsStored: [],
    restaurants: [],
    recommendation: "undefined"
  }),

  mounted: async function() {
    this.restaurantsStored = await restaurantService.getRestaurantCards();
    this.restaurants = await restaurantService.getRestaurantCards();
    if (this.$store.state.loggedUser.id != "") {
      this.preferences = await usersService.getUserTags(
        this.$store.state.loggedUser.id
      );
    }
    this.filters = await bookingService.getAllTags();
    await this.getRecommendation();
  },

  methods: {
    getSearchResults() {
      this.restaurants = this.search();
    },

    search() {
      // COMO REMOVER ACENTOS??
      if (this.filter == "") {
        return this.restaurantsStored.filter(
          restaurant =>
            restaurant.nome
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            restaurant.tag_name
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            restaurant.localidade
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
        );
      } else {
        return this.restaurantsStored.filter(
          restaurant =>
            (restaurant.nome
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
              restaurant.tag_name
                .toLowerCase()
                .includes(this.searchText.toLowerCase()) ||
              restaurant.localidade
                .toLowerCase()
                .includes(this.searchText.toLowerCase())) &&
            restaurant.tag_name
              .toLowerCase()
              .includes(this.filter.toLowerCase())
        );
      }
    },

    async getRecommendation() {
      if (this.$store.state.logged != false) {
        //for each pref filter the array restaurant with the ones that have a pref as main tag
        this.recommendation = [];
        this.preferences.forEach(pref => {
          this.restaurants.forEach(restaurant => {
            if (pref.tag_name == restaurant.tag_name) {
              this.recommendation.push(restaurant);
            }
          });
        });
      } else {
        this.recommendation = "undefined";
      }
    }
  },

  components: {
    RestaurantCard,
    Footer
  }
};
</script>

<style>
#recommendationText {
  font-family: "Raleway";
  color: #966227;
  margin-bottom: 5px;
  white-space: nowrap;
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
  font-size: 43px;
  color: #966227;
  background-color: white;
  line-height: 120%;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  border-radius: 15px;
}

.home .separator {
  background-color: silver;
  height: 1px;
  margin: 0px auto 15px auto;
  width: 100%;
}

.filterPos {
  display: flex;
  align-items: center;
}

.filterPos select {
  margin-left: auto;
  border: none;
  border: 0px;
  outline: 0px;
  border: 1px solid white;
  margin-bottom: 2px;
}

.cards ul {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}
.cardsRec ul {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}
.restaurants {
  margin: 15px 15%;
}
.restaurantsRec {
  margin: 15px 15%;
}
#express-form-typeahead {
  outline: none;
  border: none;
  display: flex;
  margin-left: 2px;
  margin-bottom: 3px;
  justify-content: space-between;
  align-items: center;
  margin-left: 420px;
}
#express-form-typeahead:focus {
  border: 1px solid #ccc;
}
#express-form-typeahead:hover {
  border: none;
}
#express-form-typeahead:not(:hover) {
  border: none;
}
</style>
