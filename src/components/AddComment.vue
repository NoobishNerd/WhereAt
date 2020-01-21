<template>
    <div class="container-fluid">
        <div class="row">
            <h5 class="mt-2 ml-3">Comentários</h5>
        </div>
        <div class="row">
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
                <div v-if="newRating == ''" class="col-sm-9 pl-0" style="cursor: pointer">
                    <img @click="ratingStar(1)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
                </div>
                <div v-if="newRating == 1" class="col-sm-9 pl-0" style="cursor: pointer">
                    <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
                </div>
                <div v-if="newRating == 2" class="col-sm-9 pl-0" style="cursor: pointer" >
                    <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
                </div>
                <div v-if="newRating == 3" class="col-sm-9 pl-0" style="cursor: pointer">
                    <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
                </div>
                <div v-if="newRating == 4" class="col-sm-9 pl-0" style="cursor: pointer">
                    <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star.png" width="30px">
                </div>
                <div v-if="newRating == 5" class="col-sm-9 pl-0" style="cursor: pointer">
                    <img @click="ratingStar(1)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(2)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(3)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(4)" src="../assets/Star Colored.png" width="30px">
                    <img @click="ratingStar(5)" src="../assets/Star Colored.png" width="30px">
                </div>
            <div class="col-sm-2">
                <button id="cancelBtn" class="mt-0 px-1 mr-2 py-1">Cancelar</button>
                <button id="commentBtn" class="mt-0 px-2 py-1 mb-2">Comentar</button>
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
        font-size: 15px;
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
        font-size: 15px;
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