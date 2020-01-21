<template>
<div class="container">
    <div class="form-group">
        <div class="row">
            <div class="mt-3 col-sm-12">
                <h4>Informações relevantes</h4>
                <hr>
                <h6 v-if="restaurant.info == ''">Este restaurante ainda não adicionou informações adicionais</h6>
                <h6 v-else style="white-space: pre-wrap">{{restaurant.info}}</h6>
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

