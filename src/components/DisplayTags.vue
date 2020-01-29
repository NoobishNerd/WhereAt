<template>
    <div class="container">
        <h4 class="mt-3">Categorias do restaurante</h4>
        <hr>
        <div class="row">
            <div class="col-sm-2" v-for="tag in restaurant.tags" v-bind:key="tag.id">                        
                <p v-if="tag.principal == true" class="text-center principal" style="color: white;">{{tag.tag_name}}</p>
                <p v-if="tag.principal == false" class="text-center side">{{tag.tag_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DisplayTags",
    data: () => ({

    }),
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.principal {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;
  border-radius: 40px 40px 40px 40px;
  background-color: #f17526;
}
.side {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;    
  border-radius: 40px 40px 40px 40px;  
}

</style>
