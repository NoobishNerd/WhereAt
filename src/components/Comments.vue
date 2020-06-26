<template>
  <div class="container-fluid">

    <div v-if="this.$store.state.loggedUser.type != 'restaurant'">

    <div v-if="this.$store.state.logged == true">
      <div class="row mt-3">
        <div class="col-sm-1">
          <img class="mt-2 ml-1" :src="loggedUser.profilePic" style="object-fit: cover" width="60" height="60">
        </div>
        <div class="col-sm-11 pl-0">
          <div class="mt-2 form-group">
            <textarea v-model="newComment" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-1 pr-0">
        </div>
        <div v-if="newRating == ''" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
        </div>
        <div v-if="newRating == 1" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
        </div>
        <div v-if="newRating == 2" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
        </div>
        <div v-if="newRating == 3" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
        </div>
        <div v-if="newRating == 4" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
        </div>
        <div v-if="newRating == 5" class="col-sm-8 pl-0" style="cursor: pointer">
          <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(4)" src="../assets/Star Colored.png" width="30px">
          <img @click="ratingStar(5)" src="../assets/Star Colored.png" width="30px">
        </div>
        <div class="col-sm-3 text-right">
          <button @click="cancelComment" id="cancelBtn" class="mt-0 px-1 mr-2 py-1 ml-2">Cancelar</button>
          <button v-if="newComment==''" @click="addComment" id="commentBtn" class="mt-0 px-2 py-1 mb-2" disabled
            style="cursor:not-allowed">Comentar</button>
          <button v-if="newComment!=''" @click="addComment" id="commentBtn"
            class="mt-0 px-2 py-1 mb-2">Comentar</button>
        </div>
      </div>
    </div>
    <div v-else class="row mt-3">
      <h5 class="text-center mt-2 ml-3">Precisa de estar autenticado para comentar!</h5>
    </div>
  </div>

<hr>



    <div class="row" v-for="comment in comments" v-bind:key="comment.id_user">
      <div class="col-sm-1">
        <img :src="comment.profilePic" class="mt-2 ml-1" style="object-fit: cover" width="60" height="60" />
      </div>
      <div class="col-sm-9 pl-0">
        <h6 class="pt-1 mb-1" id="brownBoldText" style="color:#f17526">{{comment.username}}</h6>
        <p id="commentText" style="color: black">{{comment.comment}}</p>

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
import restaurantService from '../api/restaurants.js';

export default {
  name: "Comments",
  data: () => ({
    loggedUser: {},
    newComment: "",
    newRating: "",
  }),

  props: {
    comments: {
      type: Array,
      required: true
    },
    restaurant: {
      type: Object,
      required: true
    }
  },

  created: function () {
    this.loggedUser = this.$store.getters.getLoggedUser
  },

  methods: {

    ratingStar(rating) {
      this.newRating = rating
    },

    cancelComment() {
      this.newRating = ""
      this.newComment = ""
    },

    async addComment() {
      if (this.newRating == "") {
        alert("Por favor avalie o restaurante!")
      } else if (this.loggedUser.type == "restaurant") {
        alert("Contas restaurante não podem comentar")
      } else {
        // eslint-disable-next-line no-console
        console.log(this.loggedUser.id)
        let commentResponse = await restaurantService.addComment({
            id_user: this.loggedUser.id,
            comment: this.newComment,
            rating: this.newRating,
            date: this.getSystemDate()
          },
          this.$route.params.id
        )
        if (commentResponse != "Não tem Permissão para Comentar neste Restaurante") {
          this.comments.push({
            foto: this.loggedUser.profilePic,
            username: this.loggedUser.username,
            id_user: this.loggedUser.id,
            comment: this.newComment,
            rating: this.newRating,
            date: this.getSystemDate()
          })
        } else {
          alert(commentResponse)
        }
      }
      this.newComment = "";
      this.newRating = "";
    },

    getSystemDate() {
      let today = new Date()
      return `${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}-${today.getHours()}:${today.getMinutes()}`
    }
  }
};
</script>

<style scoped>
#commentText{
  color: aliceblue
}
    #commentBtn {
        background-color: #f17526;
        border: none;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }
    #cancelBtn {
        border-width: 1px;
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }
</style>