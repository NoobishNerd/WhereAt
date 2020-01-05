<template>
  <div>
    <h1>editor restaurante</h1>

    <h5>cena das fotos e album</h5>
    <TableEditor></TableEditor>

    <h5>
      botoes para os componentes editar ementa,editar promoções, ver
      comentários, editar info
    </h5>

    <h5>
      nota o editar info probably faz-se só com um v-if os outros poderao
      necessitar de componentes
    </h5>
  </div>
</template>
<script>
import TableEditor from "../components/TableEditor.vue";
export default {
  data: () => ({
    component: "info"
  }),

  methods: {
    call(newComponent) {
      this.component = newComponent;
    }
  },

  components: {
    TableEditor
  }
};
</script>
