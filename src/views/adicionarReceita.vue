<template>
  <div class="teste1 lighten-1 fill-height">
    <v-container>
      <v-container class="mt-10" text-center>
        <v-row class="pa-0 elevation-3 mx-auto, grey lighten-3 rounded-xl">
          <v-col cols="">
            <h1 class="orange--text h1">Formulário para envio de receita</h1>
            <v-form>
              <v-text-field
                name="Novareceita"
                label="Nome da Receita"
                v-model="novaReceita"
                class="mt-4 mr-2"
                rounded
                solo
                dense
                placeholder="Nome da receita"
              >
              </v-text-field>
            </v-form>
            <v-text-field
              solo
              prepend-inner-icon="mdi-camera"
              label="Adicionar link da imagem "
              color="red darken-1"
              v-model="imgChamada"
            ></v-text-field>
            <div class="preVisu">
              <img class="img" :src="imgChamada" />
            </div>

            <v-divider></v-divider>
            <div>
              <h2 class="h2 mt-2 orange--text">
                <v-icon>mdi-noodles</v-icon>Ingredientes
              </h2>
            </div>
            <v-textarea
              name="ingredientes"
              solo
              color="black"
              auto-grow
              v-model="ingredientes"
              label="Escreva cada ingrediente por linha.Exemplo: 4x ovos "
            ></v-textarea>
          </v-col>

          <v-divider vertical></v-divider>

          <v-col class="mt-6">
            <div class="orange--text"><h2 class="h2">Tempo de preparo</h2></div>
            <v-row class="pa-0">
              <v-text-field
                name="hora"
                v-model="hora"
                prepend-inner-icon="mdi-timer"
                rounded
                filled
                solo
                class="mt-4 mr-2 ml-2"
                label="Hora"
              ></v-text-field>

              <v-text-field
                name="minuto"
                v-model="minuto"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Minutos"
              ></v-text-field>
            </v-row>
            <v-divider></v-divider>

            <div>
              <h2 class="h2 orange--text">
                <v-icon class="gray">mdi-food-takeout-box</v-icon>
                Modo de preparo
              </h2>
              <v-textarea
                name="passos"
                v-model="modoPreparo"
                class="mt-3"
                solo
                color="black"
                auto-grow
                label="Descreva os passos por linha.  "
              ></v-textarea>
            </div>
            <div v-if="this.receita != undefined">
              <v-btn @click="atualizarReceita" rounded color="orange"
                >Atualizar receita</v-btn
              >
            </div>
            <div v-else>
              <v-btn @click="adicionar" block rounded color="orange"
                >Enviar receita</v-btn
              >
            </div>
          </v-col>
          <v-col>
            <v-img
              class="rounded-xl"
              src="@/assets/images/Frigideira.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      selected: [],
      uid: "",
      novaReceita: "",
      imgChamada: "",
      ingredientes: "",
      modoPreparo: "",
      hora: "",
      minuto: "",
      passos: "",
      comentarios: [],
      comentarioTexto: "",
      comentarista: "",
    };
  },
  created() {
    if (this.receita != undefined) {
      this.novaReceita = this.receita.novaReceita;
      (this.imgChamada = this.receita.imgChamada),
        (this.ingredientes = this.receita.ingredientes),
        (this.hora = this.receita.hora),
        (this.minuto = this.receita.minuto),
        (this.modoPreparo = this.receita.modoPreparo);
    }
  },
  methods: {
    async adicionar() {
      this.uid = fb.auth.currentUser.uid;
      await fb.tasksCollection.add({
        uid: this.uid,
        novaReceita: this.novaReceita,
        imgChamada: this.imgChamada,
        ingredientes: this.ingredientes,
        hora: this.hora,
        minuto: this.minuto,
        modoPreparo: this.modoPreparo,
        comentarios: [],
        curtidas: [],
        comentarioTexto: "",
      });
    },
    async atualizarReceita() {
      await fb.tasksCollection.doc(this.receita.id).update({
        novaReceita: this.novaReceita,
        imgChamada: this.imgChamada,
        ingredientes: this.ingredientes,
        hora: this.hora,
        minuto: this.minuto,
        modoPreparo: this.modoPreparo,
      });
    },
  },
};
</script>

<style>
.img {
  margin-bottom: 10px;
  max-width: 2200px;
  max-height: 150px;
}
.preVisu {
  margin-bottom: 10px;
  height: 150px;
}

.teste1 {
  background-image: url(../assets/images/wallpaper.png);
}
</style>
