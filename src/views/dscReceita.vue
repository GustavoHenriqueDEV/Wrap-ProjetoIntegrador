<template>
  <v-container class="orange lighten-4" fill-height fluid>
    <v-container class="text-center mt-16">
      <div>
        <h1 class="h1 orange--text">
          {{ receita.novaReceita }}
        </h1>
      </div>
    </v-container>
    <v-container text-center class="mb-16">
      <v-row class="elevation-3 mx-auto, rounded-xl orange lighten-3">
        <v-col class="rounded-xl">
          <v-div>
            <h2 class="h2 mb-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Ingredientes:
            </h2>
          </v-div>

          <v-textarea
            :value="receita.ingredientes"
            class="mt-3"
            solo
            color="black"
            auto-grow
            name="igfirebaselack"
          ></v-textarea>
          <v-divider></v-divider>
          <v-div class="orange--text"
            ><h2 class="h2">Tempo de preparo:</h2>
          </v-div>
          <v-row class="rounded-xl">
            <v-col class="rounded-xl">
              <v-text-field
                name="minuto"
                :value="receita.hora"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Hora"
              ></v-text-field>
            </v-col>
            <h1 class="h1 mt-8">:</h1>
            <v-col class="rounded-xl">
              <v-text-field
                name="minuto"
                :value="receita.minuto"
                prepend-inner-icon="mdi-timer"
                rounded
                solo
                filled
                class="mt-4 mr-2 ml-2"
                label="Minuto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-div class="rounded-xl">
            <h2 class="h2 orange--text">
              <v-icon class="gray">mdi-food-takeout-box</v-icon>
              Modo de preparo:
            </h2>

            <v-textarea
              name="igfirebaselack"
              :value="receita.modoPreparo"
              class="mt-3"
              solo
              color="black"
              auto-grow
            ></v-textarea>
          </v-div>
        </v-col>
        <v-divider vertical></v-divider>

        <v-col class="rounded-xl">
          <v-img
            class="mt-8 rounded-xl"
            height="500"
            max-width="700"
            src="@/assets/images/DescImage.png"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
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
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,

          modoPreparo: doc.data().modoPreparo,
        });
      }
      console.log(this.tasks);
    },
  },
};
</script>

<style></style>
