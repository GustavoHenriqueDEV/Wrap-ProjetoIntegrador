<template>
  <v-card max-width="1300" class="my-12 vCard"
    ><v-card-title class="justify-center"
      ><h2>Comentarios</h2>
      <v-icon class="ml-3" color="orange">mdi-comment</v-icon></v-card-title
    >
    <v-textarea
      solo
      background-color="grey lighten-2"
      auto-grow
      class="rounded-xl ml-5 mr-5 white"
      label="O que achou desta receita?"
    >
    </v-textarea>
    <div class="buttonSend">
      <v-btn class="orange white--text"
        ><v-icon class="mr-1">mdi-comment-check-outline</v-icon>Enviar
        comentario</v-btn
      >
    </div>
    <v-divider></v-divider>
    <v-card-text>
      <row>
        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col class="orange--text mt-1" cols="12" sm="6" md="1"
              ><v-icon class="mr-1 mb-2">mdi-account</v-icon>Maria
              <div>10/04/20022</div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6" md="8">
              <h4 class="pa-2 h1">
                Sensacional!!!! Exatamente 1 hora no forno. Otima consistência.
                Cobri com papel alumínio
              </h4>
            </v-col>
          </v-row>
        </v-container>
      </row>
    </v-card-text>
  </v-card>
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
    this.buscarComentarios();
  },
  methods: {
    async buscarComentarios() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.comentarios.push({
          comentarios: doc.data().comentarios,
        });
      }
      console.log(this.comentarios);
    },
    async enviarComentario() {
      this.comentarios.push(this.comentarioTexto);
      await fb.tasksCollection.doc(this.receita.id).update({
        comentarios: this.comentarios,
      });
      console.log(this.comentarios);
    },
  },
};
</script>

<style>
.buttonSend {
  margin-bottom: 10px;
  margin-left: 1055px;
}
.vCard {
  font-family: "Courier New", Courier, monospace;
  margin-left: 250px;
}
</style>
