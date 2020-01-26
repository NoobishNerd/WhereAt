<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-1">
            <img :src="comment.profilePic" class="mt-2 ml-1" style="object-fit: cover" width="60" height="60" />
        </div>
        <div class="col-sm-9 pl-0">
          <h6 class="pt-1 mb-1" id="brownBoldText">{{comment.username}}</h6>
          <h5 id="commentText" style="color: black">{{comment.text}}</h5>

        </div>
        <!--<div class="col-sm-6">
          <h6>{{comment.rate}}</h6>
          <br>
        </div>-->
        <div v-if="comment.rate == 1" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rate == 2" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rate == 3" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rate == 4" class="col-sm-2">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star Colored.png" width="30px">
          <img src="../assets/Star.png" width="30px">
        </div>
        <div v-if="comment.rate == 5" class="col-sm-2">
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

  methods:{
    
    getCommentData(){
        //username: this.loggedUser.username,
                   // profilePic: this.loggedUser.profilePic,
    }
    
  },

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