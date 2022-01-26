<template>
  <v-container class="pa-4">
    <v-row class="mt-4" align="center" justify="center">
      <template v-for="(receita, i) in receitas">
        <v-col :key="i" cols="12" md="4">
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
</template>

<script>
import * as fb from "@/plugins/firebase";
import router from "../router";

export default {
  data() {
    return {
      receitas: [],
      uid: "",
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
    DeletarReceita() {},
    irDescReceita(receita) {
      router.push({ name: "descReceita", params: { receita } });
    },
  },
};
</script>

<style></style>
