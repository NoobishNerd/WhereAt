<template>
        <div class="col-sm-4">
            <div id="card" class="card border-dark mb-3" style="width: 18rem;">
                <h5 id="cardName" class="card-title text-center font-weight-bold">Restaurante Bananeira</h5>
                <img id="cardImg" class="card-img-top"
                    src="../assets/banana.jpg"
                    alt="restaurante">
                <div class="card-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <img src="../assets/Star Colored.png" class="bottom-right" style="width:45%">
                        <text id="cardRank">rank<text>
                    </div>
                    <div class="col-sm-5">
                        <b class="text-center" id="cardText">category</b>
                    </div>
                    <div class="col-sm-3">
                        <b id="cardComments" class="text-left">comments</b>
                        <img src="../assets/Speech Bubble.png" class="bottom-right" style="width:60%">
                    </div>
                </div>

                <hr>
                <button class="btn btn-dark" style="width: 100%">Ver Mais</button>
                </div>
            </div>
        </div>
</template>

<style lang="stylus" scoped>
.card-img-top{
    padding: 5px 5px 0;
    border-radius: 5px;
    width: 100%;
    height: 11vw;
}

.card-title{
    text-align:center;
    position: relative;
    border: 2px solid black;
	border-radius:3px;
	padding:7px 0px;
    margin:8px 10px;
    font-family: Lobster;
    font-size:30px;
}

.card-body{
    border:1px solid black;
	border-radius:10px;
	padding:10px 10px;
    margin:10px 10px;
    font-family: Lobster;
}

#cardBtn{
    width: 100%;
    font-family: "Raleway", bold;
}

#likeBtn{
    width: 100%;
    font-family: "Raleway", bold;
}

#card{
    border-width: 5px;
    border-radius:10px;
}

.ratingStar{
    width: 260%;
}

#btnMakeProfilePic{
    border: solid 2px;
    border-color: black;
    border-radius: 12px
}
</style>