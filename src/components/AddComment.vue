<template>
    <div class="container-fluid">
        <div class="row">
            <h5 class="mt-2 ml-3">Comentários</h5>
        </div>
        <div class="row">
            <div class="col-sm-1">
                <img class="mt-2 ml-1" :src="loggedUser.profilePic" style="object-fit: cover" width="60" height="60">
            </div>
            <div class="col-sm-11">
                <div class="form-group">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "AddComment",
  data: () => ({
      loggedUser: {}
  }),
  props:{
    restaurant:{
      type: Object,
      required: true
    }
  },
  created: function(){
      this.loggedUser = this.$store.getters.getLoggedUser
  }

}
</script>