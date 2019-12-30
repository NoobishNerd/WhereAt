<template>
<div>
  <h1>perfil restaurante</h1>

  <h5>botoes para os componentes ver ementa,ver promoções, ver comentários, ver info</h5>

  <h5>nota o ver info probably faz-se só com um v-if os outros poderao necessitar de componentes</h5>
  </div>
</template>
<script>

export default {
  
    data: () => ({
    component: "info"
  }),

  methods:{
      call(newComponent){
          this.component = newComponent
      }
  },
  /*
    components: {
    ClientInfo,
    ClientHistory
  }*/
}
</script>