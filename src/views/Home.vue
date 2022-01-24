<template>
  <v-container class="pa-4" fluid>
    <v-row class="mt-4" align="center" justify="center">
      <template v-for="(receita, i) in receitas">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              @click="irDescReceita(receita)"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img :src="receita.imgChamada" height="225px">
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p
                      class="mt-4 subheading text-left black--text text-center"
                    >
                      {{ receita.novaReceita }}
                    </p>

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
