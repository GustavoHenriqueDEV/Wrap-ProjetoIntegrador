<template>
  <v-row class="row d-flex">
    <v-col class="carousel1" cols="8" md="9">
      <v-card elevation="10" width="1430" class="mx-auto mt-10  ">
        <v-carousel hide-on-leave hide-delimiter-background class="1">
          <v-carousel-item
            v-for="(receita, i) in receitas"
            :key="i"
            :src="receita.imgChamada"
            @click="irDescReceita(receita)"
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-col>
  </v-row>
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
    this.getImg();
  },
  methods: {
    async getImg() {
      const logtasks = await fb.tasksCollection.get();
      for (const doc of logtasks.docs) {
        this.receitas.push({
          imgChamada: doc.data().imgChamada,
          id: doc.id,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
          ingredientes: doc.data().ingredientes,
          novaReceita: doc.data().novaReceita,
          modoPreparo: doc.data().modoPreparo,
          comentarios: doc.data().comentarista,
        });
      }
    },
    irDescReceita(receita) {
      router.push({ name: "descCarrousel", params: { receita } });
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

.carousel1{
  margin-left:200px;
}

.carousel {
  height: 300px !important;
}
.carousel2 {
  height: 230px !important;
}
.carousel3 {
  height: 230px !important;
}
.row {
  padding-left: 120px;
}
</style>
