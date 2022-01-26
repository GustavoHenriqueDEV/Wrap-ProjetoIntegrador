<template>
  <v-container class="">
    <div class="text-center">
      <h1 class="h1 mt-8 orange--text">
        Enviar receita
        <v-icon large color="black">mdi-note-edit</v-icon>
      </h1>
    </div>
    <v-container class="mt-10" text-center>
      <v-row class="elevation-3 mx-auto, orange lighten-3 rounded-xl">
        <v-col>
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

          <template>
            <v-text-field
              solo
              prepend-inner-icon="mdi-camera"
              label="Adicionar link da imagem "
              color="red darken-1"
              v-model="imgChamada"
            ></v-text-field>
          </template>
          <v-divider></v-divider>
          <v-div>
            <h2 class="h2 mt-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Ingredientes
            </h2>
          </v-div>
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
          <v-div class="orange--text"
            ><h2 class="h2">Tempo de preparo</h2></v-div
          >
          <v-row>
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
            <h1 class="mt-4">:</h1>
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

          <v-div>
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
          </v-div>
          <v-btn @click="adicionar" block rounded color="orange"
            >Enviar receita</v-btn
          >
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
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novaReceita: "",
      imgChamada: "",
      igredientes: "",
      hora: "",
      minuto: "",
      passos: "",
    };
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
      });
    },
  },
};
</script>

<style></style>
