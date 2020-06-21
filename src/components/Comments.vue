<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-1">
            <img :src="comment.foto" class="mt-2 ml-1" style="object-fit: cover" width="60" height="60" />
        </div>
        <div class="col-sm-9 pl-0">
          <h6 class="pt-1 mb-1" id="brownBoldText" style="color:#f17526">{{comment.user_name}}</h6>
          <p id="commentText" style="color: black">{{comment.txt_comentario}}</p>

        </div>
        <!--<div class="col-sm-6">
          <h6>{{comment.rating}}</h6>
          <br>
        </div>-->
        <div v-if="comment.rating == 1" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rating == 2" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rating == 3" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rating == 4" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rating == 5" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
        </div>

      </div>

      <br>

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

<style scoped>
#commentText{
  color: aliceblue
}
</style>