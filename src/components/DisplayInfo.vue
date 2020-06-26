<template>
  <div class="container">
    <div class="form-group">
      <div class="row">
        <div class="mt-3 col-sm-12">
          <h6>
            <strong>Endereço:</strong> {{ restaurant.address }},
            {{ restaurant.postalCode }} {{ restaurant.local }}
          </h6>
          <!-- <h6><strong>Telefone:</strong> {{ restaurant.phone }}</h6> -->
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoEditor",
  data: () => ({}),
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped></style>
