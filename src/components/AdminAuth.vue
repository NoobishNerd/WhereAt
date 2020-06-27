<template>
  <div class="adminAuth">
    <div
      v-for="restaurant in restaurants"
      v-bind:key="restaurant.id_restaurant"
    >
      <div class="row">
        <div class="card-group" style="width: 30rem; cursor:pointer">
          <div class="container-fluid">
            <div class="card img-thumbnail">
              <img
                class="card-img-top img-fluid"
                :src="restaurant.profilePic"
                alt="Card image cap"
              />
              <div class="card-body">
                <h6 class="card-title text-left mb-0">
                  {{ restaurant.address }} {{ restaurant.postalCode }},
                  {{ restaurant.local }}
                </h6>
                <h4
                  class="card-title text-left font-weight-bold mb-1"
                  id="restaurantCardName"
                >
                  {{ restaurant.name }}
                </h4>
                <h2 style="color:green" v-if="restaurant.approval == true">
                  Aprovado
                </h2>
                <h2 style="color:red" v-if="restaurant.approval == false">
                  Não Aprovado
                </h2>
                <div class="d-flex justify-content-between">
                  <button
                    id="sucess"
                    type="button"
                    class="btn"
                    style="color:white"
                    @click="
                      manageRestaurantApproval(
                        restaurant.id_restaurant,
                        restaurant.approval,
                        true
                      )
                    "
                    :class="{
                      btnEnabled: restaurant.approval == false,
                      btnDisabled: restaurant.approval == true
                    }"
                  >
                    Aprovar
                  </button>
                  <button
                    id="danger"
                    type="button"
                    class="btn"
                    style="color:white"
                    @click="
                      manageRestaurantApproval(
                        restaurant.id_restaurant,
                        restaurant.approval,
                        false
                      )
                    "
                    :class="{
                      btnEnabled: restaurant.approval == true,
                      btnDisabled: restaurant.approval == false
                    }"
                  >
                    Suspender
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import restaurantService from "../api/restaurants.js";
import usersService from "../api/users";

export default {
  data: () => ({
    restaurants: []
  }),
  created: async function() {
    this.restaurants = await restaurantService.getAllRestaurants();
  },

  methods: {
    async manageRestaurantApproval(restaurantId, currentValue, newValue) {
      if (currentValue != newValue) {
        let restaurant = await usersService.getRestaurantById(restaurantId);

        await usersService.updateRestaurant(
          {
            profilePic: restaurant.profilePic,
            info: restaurant.info,
            approval: newValue,
            availability: restaurant.availability
          },
          restaurantId
        );

        this.restaurants = await restaurantService.getAllRestaurants();
      }
    }
  }
};
</script>
<style>
.btnEnabled {
  background-color: red;
  color: black;
}

.btnDisabled {
  background-color: green;
  color: black;
}
.adminAuth {
  align-items: center;
  margin: auto;
}
.card-body {
  padding: 0;
}
.card-img-thumbnail {
  border: none;
}
#sucess {
  background-color: #f17526;
}
#danger {
  background-color: #444343;
}
</style>
