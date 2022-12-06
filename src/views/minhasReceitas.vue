<template>
  <div class="wallpaper fill-height">
    <v-container class="pa-4">
      <v-row class="mt-4" align="center" justify="center">
        <template v-for="(receita, i) in receitas">
          <!-- eslint-disable-next-line -->
          <v-col :key="i" cols="12" md="4">
            <v-btn
              dark
              class="red lighten-1"
              @click="deletarReceita(receita.id)"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <v-btn
              @click="editarReceita(receita)"
              class="mx-2"
              dark
              color="cyan"
            >
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>

            <v-btn class="ml-1" @click="comentarReceita(receita)">
              <v-icon>mdi-comment</v-icon></v-btn
            >

            <v-hover v-slot="{ hover }">
              <v-card
                class="rounded-xl grey lighten-2"
                @click="irDescReceita(receita)"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <h2 class="h2">
                  <p class="mt-4 subheading text-left black--text text-center">
                    {{ receita.novaReceita }}
                  </p>
                </h2>
                <v-img :src="receita.imgChamada" height="225px">
                  <v-card-title class="text-h6 white--text">
                    <v-row
                      class="fill-height flex-column"
                      justify="space-between"
                    >
                      <div class="align-self-center"></div>
                    </v-row>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-hover>
           
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as fb from "@/plugins/firebase";
import router from "../router";

export default {
  data() {
    return {
      receitas: [],
      uid: "",
      comentario: "",
      mycoments: [],
    };
  },

  mounted() {
    this.buscarReceitas();
    this.getComentarios();
  },
  /**USAR A MESMA LOGICA PARA FAZER UM GETCOMENTARIO ((INICIALMENTE)) */
  //QUANDO O USUAIRO COMENTAR O UID DELE PRECISA IR JUNTO PARA QUE EU POSSA RELACIONAR
  methods: {
    async buscarReceitas() {
      this.receitas = [];
      this.uid = fb.auth.currentUser.uid;
      const logtasks = await fb.tasksCollection
        .where("uid", "==", this.uid)
        .get();
      for (const doc of logtasks.docs) {
        this.receitas.push({
          uid: this.uid,
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,
          imgChamada: doc.data().imgChamada,
          modoPreparo: doc.data().modoPreparo,
          curtidas: doc.data().curtidas,
          comentarios: doc.data().comentarios,
        });
      }
    },
    async getComentarios() {
      this.uid = fb.auth.currentUser.uid;
      const logcoment = await fb.tasksCollection
        .where("uid", "==", this.uid)
        .get();
      for (const doc of logcoment.docs) {
        this.mycoments.push({
          comentarios: doc.data().comentarios,
        });
      }
      console.log(this.mycoments);
    },

    async deletarReceita(id) {
      await fb.tasksCollection.doc(id).delete();
      this.buscarReceitas();
    },
    irDescReceita(receita) {
      router.push({ name: "descReceita", params: { receita } });
    },
    comentarReceita(receita) {
      router.push({ name: "comentario", params: { receita } });
    },

    editarReceita(receita) {
      router.push({
        name: "adicionarReceita",
        params: { receita, id: receita.id },
      });
    },
    async comentar() {
      await fb.tasksCollection.doc(this.receita.id).update({
        comentario: this.comentario,
      });
    },
    async curtir(receita) {
      let curtidas = receita.curtidas;
      let user = fb.auth.currentUser.uid;
      if (curtidas.includes(user)) {
        curtidas.splice(curtidas.indexOf(user), 1);
        await fb.tasksCollection.doc(receita.id).update({
          curtidas: curtidas,
        });
      } else {
        curtidas.push(user);
        await fb.tasksCollection.doc(receita.id).update({
          curtidas: curtidas,
        });
      }
      this.receitas = [];
      this.buscarReceitas();
    },
  },
};
</script>

<style>
.wallpaper {
  background-image: url(../assets/images/MinhasReceitasWallpaper.png);
}
</style>
