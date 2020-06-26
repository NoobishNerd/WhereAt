<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3 pr-0">
                <label class="mt-2" for="mainTagSlt">Escolher tag principal</label>
                <select v-model="newMainTag" id="MainTagSlt" class="form-control">
                    <option v-for="tag in tags" v-bind:key="tag.id_tag" :value="tag.id_tag">{{tag.tag_name}}</option>
                </select>
            </div>
            <div class="col-sm-1 mt-3 mr-5">
                <button @click="changeMainTag()" id="changeMainBtn" class="mt-4 px-3 py-2">Salvar</button>
            </div>
            <div class="col-sm-3 pr-0">
                <label class="mt-2" for="addTagTxt">Adicionar Tag</label>
                <input v-model="newTag" class="form-control" type="text" id="addTagTxt">
            </div>
            <div class="col-sm-1 mt-3">
                <button @click="addTag()" id="addTagBtn" class="mt-4 px-3 py-2">Adicionar</button>
            </div>
        </div>        

        <h4 class="mt-3">Categorias do restaurante</h4>
        <hr>
        <div class="row">
            <div class="col-sm-2" v-for="tag in tags" v-bind:key="tag.id_tag + 1000">                        
                <p v-if="tag.tag_main == true" class="text-center main" style="color: white;">{{tag.tag_name}} <span class="ml-2"><button @click="removeTag(tag.id_tag)" id="removeTagBtn">X</button></span></p>
                <p style="color:black" v-if="tag.tag_main == false" class="text-center side">{{tag.tag_name}} <span class="ml-2"><button @click="removeTag(tag.id_tag)" id="removeTagBtnWhite">X</button></span></p>
            </div>
        </div>
    </div>
</template>

<script>
import restaurantService from '../api/restaurants'
export default {
    name: "TagEditor",
    data: () => ({
        newMainTag: "",
        newTag: "",
        tags: []
    }),
    props: {
        restaurantId: {
            required: true
        }
    },

    created: async function () {
        this.tags = await restaurantService.getRestaurantTags(this.restaurantId);
    },

    methods: {
        async changeMainTag() {
            await restaurantService.updateRestaurantTag(this.restaurantId, this.newMainTag);
            this.tags = await restaurantService.getRestaurantTags(this.restaurantId);
        },
        async addTag() {
            await restaurantService.addRestaurantTag({
                tag_name: this.newTag
            }, this.restaurantId);
            this.tags = await restaurantService.getRestaurantTags(this.restaurantId);
        },
        async removeTag(id) {
            await restaurantService.deleteRestaurantTag(this.restaurantId, id);
            this.tags = await restaurantService.getRestaurantTags(this.restaurantId);
        }
    }
}
</script>

<style scoped>
.main {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;
  border-radius: 40px 40px 40px 40px;
  background-color: #f17526;
}
.side {
  border-style: solid;
  border-width: 4px;
  border-color: #f17526;    
  border-radius: 40px 40px 40px 40px;  
}
#changeMainBtn {
    background-color: #f17526;
    border: none;
    color: #ffffff;

    text-decoration: none;
    text-transform: uppercase;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

#addTagBtn {
    background-color: #f17526;
    border: none;
    color: #ffffff;

    text-decoration: none;
    text-transform: uppercase;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

#removeTagBtn {
    background-color: #f17526;
    border: none;
    color: #ffffff;

    text-decoration: none;
    text-transform: uppercase;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

#removeTagBtnWhite {
    background-color: white;
    border: none;

    text-decoration: none;
    text-transform: uppercase;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
</style>