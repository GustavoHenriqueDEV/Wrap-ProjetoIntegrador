<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height mt-4" align="center" justify="center">
      <template v-for="(receitas, i) in tasks">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              @click="irDescReceita"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img :src="receitas.imagens" height="225px">
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left black--text">
                      {{ receitas.novaReceita }}
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
      tasks: [],
    };
  },

  mounted() {
    this.buscarReceitas();
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
    irDescReceita() {
      router.push({ name: "descReceita" });
    },
  },
};
</script>

<style scoped></style>
