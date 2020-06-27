<template>
    <div class="container">
        <h4 class="mt-3" style="color:#f17526">Categorias do restaurante</h4>
        <div class="row">
            <div class="col-sm-2 pt-3" v-for="tag in tags" v-bind:key="tag.id_tag">                        
                <p v-if="tag.tag_main == true" class="text-center main" style="color: white;">{{tag.tag_name}}</p>
                <p v-if="tag.tag_main == false" class="text-center side">{{tag.tag_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import restaurantService from '../api/restaurants.js';

export default {
    name: "DisplayTags",
    data: () => ({
        tags: []
    }),
    props: {
        restaurantId: {
            type: Number,
            required: true
        }
    },

    created: async function () {
        this.tags = await restaurantService.getRestaurantTags(this.restaurantId);
    }


}
</script>

<style scoped>
.main {
  border-style: solid;
  border-width: 2px;
  border-color: #f17526;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: #f17526;
}
.side {
  border-style: solid;
  border-width: 2px;
  border-color: #f17526;    
    -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

</style>
