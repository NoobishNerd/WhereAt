<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2">
          
        </div>
        <div class="col-sm-2">
          <img :src="comment.profilePic" class="rounded-circle" width="95px" height="95px" />
          <br />
          <h5 class="pt-2" id="brownBoldText">{{comment.username}}</h5>
        </div>
        <div class="col-sm-6">
          <h6>{{comment.rate}}</h6>
          <br>
          <h5>{{comment.text}}</h5>
        </div>
        <div class="col-sm-2">
          
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: "Comments",

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

};
</script>