<template>
  <div class="brown lighten-1 fill-height">
    <v-container class="pa-4">
      <div class="btn rounded-xl white pa-1  d-flex justify-space-between">
      <v-checkbox 
                  :ripple="false"
                  class="hide-details"
                  hide-details
                  v-model="selected"
                  label="Maa"
                  value="Jon"
                ></v-checkbox>
                <v-checkbox
                  :ripple="false"

                  v-model="selected"
                  label="Mssa"
                  value="Joh"
                ></v-checkbox>
                <v-checkbox
                  :ripple="false"

                  v-model="selected"
                  label="assa"
                  value="ohn"
                ></v-checkbox>
                <v-checkbox
                  :ripple="false"

                  v-model="selected"
                  label="Mass"
                  value="hn"
                ></v-checkbox>
                <v-checkbox
                  :ripple="false"

                  v-model="selected"
                  label="Massa"
                  value="Josan"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Massa"
                  value="Johnc"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Fria"
                  value="Fria"
                ></v-checkbox>
                 <v-checkbox
                  v-model="selected"
                  label="Quente"
                  value="Quente"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Massa"
                  value="Johnc"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Fria"
                  value="Fria"
                ></v-checkbox>
                 <v-checkbox
                  v-model="selected"
                  label="Quente"
                  value="Quente"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Massa"
                  value="Johnc"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Fria"
                  value="Fria"
                ></v-checkbox>
                 <v-checkbox
                  v-model="selected"
                  label="Quente"
                  value="Quente"
                ></v-checkbox>




      </div>
      <v-row class="mt-4" align="center" justify="center">
        <template v-for="(receita, i) in receitas">
          <!-- eslint-disable-next-line -->
          <v-col :key="i" cols="12" md="4">
            <!-- eslint-disable-next-line -->
            <v-btn dark> <v-icon color="red">mdi-heart</v-icon></v-btn>

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
    comentarReceita(receita) {
      router.push({ name: "comentario", params: { receita } });
    },
  },
};
</script>

<style>


.btn{}
.heart {
}

.backgroud {
  background-color: orange;
}
</style>
