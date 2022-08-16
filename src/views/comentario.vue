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
      v-model="comentarioTexto"
    >
    </v-textarea>
    <div @click="enviarComentario" class="buttonSend">
      <v-btn class="orange white--text"
        ><v-icon class="mr-1">mdi-comment-check-outline</v-icon>Enviar
        comentario</v-btn
      >
    </div>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-container class="grey lighten-5">
          <v-row
            v-for="(comentario, index) in comentarios"
            :key="index"
            no-gutters
          >
            <v-col class="orange--text mt-1" cols="12" sm="6" md="1"
              ><v-icon class="mr-1 mb-2">mdi-account</v-icon>{{comentario.comentarista}}
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6" md="8">
              <h4 class="pa-2 h1">
                <!-- Sensacional!!!! Exatamente 1 hora no forno. Otima consistência.
                Cobri com papel alumínio -->
                {{ comentario.texto }}
              </h4>
            <v-divider></v-divider>

            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      uid: "",
      nome: "",
      comentarioTexto: "",
      comentarios: [],
      tasks: [],
    };
  },
  mounted() {
    this.getComentario();
    this.getNome();
  },
  methods: {
    async getComentario() {
      await fb.db
        .collection("tasks")
        .doc(this.receita.id)
        .get()
        .then((receita) => {
          console.log(receita.data());
          this.comentarios = receita.data().comentarios;
        });
    },
    async getNome() {
      this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get()
      this.nome = userProfile.docs[0].data().nome 

      console.log(userProfile.docs[0].data().nome)
      console.log(this.nome)
    },


    async enviarComentario() {
      this.comentarios.push({
        texto:this.comentarioTexto,
        comentarista : this.nome
      });
      console.log(this.comentarios);
      await fb.tasksCollection.doc(this.receita.id).update({
        comentarios: this.comentarios,
      });
      console.log(this.comentarios);
      this.getComentario();
    },
    metodoTeste() {
      console.log(this.comentarioTexto);
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
