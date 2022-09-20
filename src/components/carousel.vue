<template>
  <v-row class="row d-flex">
    <v-col cols="8" md="9">
      <v-card
      
       elevation="10" width="1430" class="mx-auto mt-10">
        <v-carousel hide-on-leave 
        hide-delimiter-background
         class="carousel1"
         >
          <v-carousel-item
            v-for="(receita, i) in receitas"
            :key="i"
            :src="receita.imgChamada"
          @click="irDescReceita(receita)"
  
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-col>

    <v-col cols="4" md="2" class="">
      <v-card elevation="12" max-width="300" class="carousel2 mt-10">
        <v-carousel
          hide-on-leave
          hide-delimiter-background
          class="carousel2"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(imagens, i) in receitas"
            :key="i"
            :src="imagens.imgChamada"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-card>
      <v-card elevation="12" max-width="300" class="mt-10">
        <v-carousel
          :show-arrows="false"
          hide-on-leave
          hide-delimiter-background
          class="carousel3 mr-10"
        >
          <v-carousel-item
            v-for="(imagens, i) in receitas"
            :key="i"
            :src="imagens.imgChamada"
            reverse-transition="fade-transition"
            transition="fade-transition"
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
        console.log(this.receitas);
      }
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
