<template>
  <div class="brown lighten-1 fill-height">
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
            <v-btn dark @click="curtirReceita">
              <v-icon>mdi-heart</v-icon></v-btn
            >

            <v-btn class="ml-2" @click="comentarReceita(receita)">
              <v-icon>mdi-comment</v-icon></v-btn
            >

            <v-hover v-slot="{ hover }">
              <v-card
                class="rounded-xl orange lighten-5"
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
    };
  },

  mounted() {
    this.buscarReceitas();
  },
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
        });
      }
      console.log(this.uid);
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
  },
};
</script>

<style></style>
