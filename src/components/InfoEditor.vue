<template>
<div class="container">
    <div class="form-group">
        <div class="row">
            <div class="col-sm-10">
                <label class="mt-2" for="exampleFormControlTextarea1">Editar Informação</label>
                <textarea v-model="restaurant.informacao" class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
            </div>
            <div class="col-sm-2 align-self-center">
                <button @click="saveChanges" id="saveChangesBtn" class="py-4 px-2 mt-5 mr-3">Salvar Mudanças</button>
            </div>   
        </div>

        <br>

        <div class="row">
            <div class="col-sm-12">
                <h6 style="color:black"><strong>Endereço:</strong> {{restaurant.morada}}, {{restaurant.cod_postal}} {{restaurant.localidade}}</h6>          
                <h6 style="color:black" class="mt-4" v-if="restaurant.informacao == ''">Ainda não adicionou informações adicionais</h6>
                <h6 v-else class="mt-4" style="white-space: pre-wrap; color:black">{{restaurant.informacao}}</h6>

            </div>
        </div>
    </div>
</div>
</template>

< script >
    import usersService from '../api/users'
export default {
    name: "InfoEditor",
    data: () => ({

    }),
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },

    methods: {
        async saveChanges() {
            await usersService.updateRestaurant({
                id_restaurante: this.restaurant.id_restaurante,
                nome: this.restaurant.nome,
                password: this.restaurant.password,
                foto_perfil: this.restaurant.foto_perfil,
                informacao: this.restaurant.informacao,
                morada: this.restaurant.morada,
                aprovacao: this.restaurant.aprovacao,
                cod_postal: this.restaurant.cod_postal,
                disponibilidade: this.restaurant.disponibilidade,
                email: this.restaurant.email
            }, id);
        }
    }

}
</script>

<style scoped>
    #saveChangesBtn {
        background-color: #f17526;
        border: none;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 15px;
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -ms-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

</style>