<template>
    <div class="container-fluid">
        <div class="row mt-3">
            <div class="col-sm-1">
                <img class="mt-2 ml-1" :src="loggedUser.profilePic" style="object-fit: cover" width="60" height="60">
            </div>
            <div class="col-sm-11 pl-0">
                <div class="mt-2 form-group">
                    <textarea v-model="newComment" class="form-control" id="exampleFormControlTextarea1"
                        rows="2"></textarea>
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
                <div v-if="newRating == 2" class="col-sm-8 pl-0" style="cursor: pointer" >
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
                <button v-if="newComment==''" @click="addComment" id="commentBtn" class="mt-0 px-2 py-1 mb-2" disabled>Comentar</button>
                <button v-if="newComment!=''" @click="addComment" id="commentBtn" class="mt-0 px-2 py-1 mb-2">Comentar</button>
            </div>
        </div>
        <hr>
    </div>
</template>
<script>
    export default {
        name: "AddComment",
        data: () => ({
            loggedUser: {},
            newComment: "",
            newRating: "",
        }),
        props: {
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

            addComment() {
                if (this.newRating == ""){
                    alert("Por favor avalie o restaurante!")
                } 
                else if (this.loggedUser.type == "restaurant"){
                    alert("Contas restaurante não podem comentar")                    
                }
                else{
                    this.$store.commit("ADD_COMMENT", {
                    id: this.getLastCommentId(),
                    text: this.newComment,
                    rate: this.newRating,
                    userId: this.loggedUser.id,
                    restaurantId: this.restaurant.id,
                    date: this.getSystemDate()
                    })
                }
            },

            getSystemDate() {
                let today = new Date()
                return `${today.getHours()}:${today.getMinutes()}  ${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}`
            },


            getLastCommentId() {
                if (this.restaurant.comments.length != 0){
                    return this.restaurant.comments[this.restaurant.comments.length - 1].id + 1;
                } else {
                    return 0;
                }     
            }
        }
    }
</script>

<style scoped>
    #commentBtn {
        background-color: #f17526;
        border: none;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
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
        font-weight: bold;
        -webkit-border-radius: 3px 3px 3px 3px;
        border-radius: 3px 3px 3px 3px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }
</style>