<template>
  <v-main>
    <v-container class="text-center">
      <div>
        <h1 class="h1 orange--text">Faça um comentario :D</h1>
      </div>
    </v-container>
    <v-container text-center class="mb-16">
      <v-row class="elevation-3 mx-auto, rounded-xl orange lighten-3">
        <v-col class="rounded-xl">
          <div>
            <h2 class="h2 mb-2 orange--text">
              <v-icon>mdi-comment</v-icon>
            </h2>
          </div>

          <v-textarea
            label="Insira seu comentario aqui"
            class="mt-3"
            solo
            color="black"
            auto-grow
            v-model="comentarioTexto"
            name="igfirebaselack"
          ></v-textarea>
          <v-btn @click="enviarComentario"><v-icon>mdi-send</v-icon></v-btn>
        </v-col>
        <v-col>
          <h1 class="h1">Comentarios</h1>
          <v-textarea
            solo
            color="black"
            auto-grow
            :value="receita.comentarios"
            name="igfirebaselack"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      comentarioTexto: "",
      comentarios: [],
      tasks: [],
    };
  },
  mounted() {
    this.buscarReceitas();
  },
  methods: {
    async enviarComentario() {
      this.comentarios.push(this.comentarioTexto);
      await fb.tasksCollection.doc(this.receita.id).update({
        comentarios: this.comentarios,
      });
    },

    //   async readReceita(receita) {
    //     // eslint-disable-next-line
    //     const receitaBanco = await fb.tasksCollection
    //       .where("id", "==", receita.id)
    //       .get();
    //     for (const doc of receitaBanco.docs) {
    //       console.log(doc);
    //     }
    //     console.log(this.receita);
    //   },
  },
};
</script>

<style></style>
