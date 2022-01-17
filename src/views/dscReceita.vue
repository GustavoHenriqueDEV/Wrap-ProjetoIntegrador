<template>
  <v-container class="orange lighten-5" fill-height fluid>
    <v-container text-center>
      <h1 class="h1 mb-5 orange--text">
        Nome da Receita
        <v-icon large color="gray">mdi-note-edit</v-icon>
      </h1>
      <v-row class="elevation-3 mx-auto, rounded-xl">
        <v-col>
          <v-div>
            <h2 class="h2 mb-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Igredientes
            </h2>
          </v-div>

          <v-textarea
            name="igredientes"
            solo
            color="black"
            auto-grow
            v-model="igredientes"
          ></v-textarea>
          <v-divider></v-divider>
          <v-div>
            <h2 class="h2 orange--text">
              <v-icon class="gray">mdi-food-takeout-box</v-icon>
              Modo de preparo
            </h2>
            <v-textarea
              name="passos"
              v-model="passos"
              class="mt-3"
              solo
              color="black"
              auto-grow
            ></v-textarea>
          </v-div>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col>
          <v-img src="@/assets/images/DescImage.png"></v-img>
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
      tasks: [],
    };
  },
  methods: {
    async buscarReceitas() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.tasks.push({
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          igredientes: doc.data().igredientes,
          novaReceita: doc.data().novaReceita,
          imagens: doc.data().imagem,
          modoPreparo: doc.data().passos,
        });
      }
      console.log(this.tasks);
    },
  },
};
</script>

<style></style>
