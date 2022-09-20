<template>
  <div class="pt-3 grey lighten-4 fill-height">
    <Carousel />

    <div class="destaque fill-height pt-6">MAIS DELÍCIAS</div>

    <container>
      <v-row class="mt-10 destaqueRow pl-16" align="center" justify="center">
        <template v-for="(receita, i) in receitas">
          <!-- eslint-disable-next-line -->
          <v-col :key="i" cols="12" md="2">
            <!-- eslint-disable-next-line -->

            <v-hover v-slot="{ hover }">
              <v-card
                class=""
                @click="irDescReceita(receita)"
                :elevation="hover ? 20 : 2"
                :class="{ 'on-hover': hover }"
              >
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
                <div class="">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        d-flex
                        transition-fast-in-fast-out
                        orange
                        darken-2
                        v-card--reveal
                        text-h4
                        white--text
                      "
                      style="height: 35px"
                    >
                      <div class="preco">
                        R$:
                        {{ receita.preco }}
                      </div>
                    </div>
                  </v-expand-transition>
                  <h3 class="h3">
                    <p
                      class="mt-4 subheading text-left black--text text-center"
                    >
                      {{ receita.novaReceita }}
                    </p>
                  </h3>
                  <div class="nLikes text-center">
                    <v-icon class="mb-1 mr-1" color="red">mdi-heart</v-icon
                    >{{receita.curtidas.length}}
                  </div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </container>
  </div>
</template>

<script>
import Carousel from '@/components/carousel.vue'
import * as fb from "@/plugins/firebase";
import router from "../router";

export default {
  components: {Carousel},
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
          curtidas: doc.data().curtidas,
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
.nLikes {
  color: #b8b8b8;
}
.send {
  font-size: 14px;
}
.h3 {
  font-weight: normal;
  color: #a00f0f;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 16px;
}
.app2 {
  width: 100%;
  background-color: white;
  display: flex;
}
.destaque {
  text-transform: uppercase;
  font-family: "sans-serif";
  font-size: 20px;
  margin: 0px;
  padding: 0px;
  height: 80px;
  margin-top: 35px;
  text-align: center;
  justify-content: center;
  background-color: rgb(255, 153, 0);
}
.backgroud {
  background-color: orange;
}
.destaqueRow {
  padding-right: 80px;
}
.preco {
  font-size: 25px;
}
.backgroud {
  background-color: orange;
}
</style>
