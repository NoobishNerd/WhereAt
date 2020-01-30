<template>
<div class="container">
    <div class="form-group">
        <div class="row">
            <div class="mt-3 col-sm-12">
                <h4 style="color:#f17526">Informações relevantes</h4>
                <hr>
                <h6 ><strong >Endereço:</strong> {{restaurant.address}}, {{restaurant.postalCode}} {{restaurant.local}}</h6>
                <h6><strong>Telefone:</strong> {{restaurant.phone}}</h6>
                <h6 class="mt-4" v-if="restaurant.info == ''">Este restaurante ainda não adicionou informações adicionais</h6>
                <h6 v-else class="mt-4" style="white-space: pre-wrap">{{restaurant.info}}</h6>
                <br>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "InfoEditor",
  data: () => ({

  }),
  props:{
    restaurant:{
      type: Object,
      required: true
    }
  },
}
</script>

