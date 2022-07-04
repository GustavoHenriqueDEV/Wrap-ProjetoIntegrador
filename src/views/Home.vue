<template>
  <div class="brown lighten-1 fill-height">
    <v-container class="pa-4">
      <v-row class="mt-4" align="center" justify="center">
        <template v-for="(receita, i) in receitas">
          <v-col :key="i" cols="12" md="6">
            <v-icon dark>mdi-comment</v-icon>
            <v-icon>mdi-heart</v-icon>
            <v-hover v-slot="{ hover }">
              <v-card
                class="rounded-xl orange lighten-5"
                @click="irDescReceita(receita)"
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <h2 class="h2">
                  <p class="subheading text-left black--text text-center">
                    {{ receita.novaReceita }}
                  </p>
                </h2>
                <v-img :src="receita.imgChamada" height="250px">
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
    };
  },

  mounted() {
    this.buscarReceitas();
  },
  methods: {
    async buscarReceitas() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.receitas.push({
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,
          imgChamada: doc.data().imgChamada,
          modoPreparo: doc.data().modoPreparo,
        });
      }
      console.log(this.receitas);
    },
    irDescReceita(receita) {
      router.push({ name: "descReceita", params: { receita } });
    },
  },
};
</script>

<style>
.backgroud {
  background-color: orange;
}
</style>
