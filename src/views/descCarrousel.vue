<template>
  <container class="orange lighten-5">
    <v-container text-center class="pa-10 mb-16">
      <v-row class="pa-0 elevation-3 mx-auto, white">
        <v-col class="rounded-xl pt-16">
          <div>
            <h1 class="h2 mb-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Ingredientes:
            </h1>
          </div>

          <div class="receitaBox">
            <p class="receitaContent">{{ receita.ingredientes }}</p>
          </div>
          <v-divider class="mt-3"></v-divider>

          <div class="orange--text"><h1 class="h2">Tempo de preparo:</h1></div>
          <v-row class="pa-0 rounded-xl">
            <v-col class="rounded-xl">
              <div class="timeBox">
                <p class="timeContent">{{ receita.hora }} Hora</p>
              </div>
            </v-col>
            <h1 class="h1 mt-3">:</h1>
            <v-col class="rounded-xl">
              <div class="timeBox">
                <p class="timeContent">{{ receita.minuto }} Minutos</p>
              </div>
            </v-col>
          </v-row>

          <v-divider class="mt-3"></v-divider>

          <div class="rounded-xl">
            <h1 class="h2 orange--text">
              <v-icon class="gray">mdi-food-takeout-box</v-icon>
              Modo de preparo:
            </h1>
            <div class="precoBox">
              <p class="precoContent">{{ receita.modoPreparo }}</p>
            </div>
          </div>
        </v-col>
        <v-col class="rounded-xl">
          <div class="foodName">
            <h1 class="receitaName h1 orange--text">
              {{ receita.novaReceita }}
              <v-btn class="mt-1 ml-3" @click="curtir(receita)" dark>
                <v-icon color="red">mdi-heart</v-icon>
              </v-btn>
            </h1>
          </div>
          <v-img
            class="image rounded-xl"
            height="500"
            max-width="700"
            :src="receita.imgChamada"
          ></v-img>
        </v-col>
        <v-card width="10000"
          ><v-card-title class="justify-center"
            ><h2>Comentarios</h2>
            <v-icon class="ml-3" color="orange"
              >mdi-comment</v-icon
            ></v-card-title
          >
          <v-textarea
            solo
            background-color="grey lighten-2"
            auto-grow
            class="rounded-xl ml-5 mr-5 white"
            label="O que achou desta receita?"
            v-model="comentarioTexto"
          >
          </v-textarea>
          <div @click="enviarComentario" class="ml-1 buttonSend">
            <v-btn class="orange white--text"
              ><v-icon class="mr-1">mdi-comment-check-outline</v-icon>Enviar
              comentario</v-btn
            >
          </div>

          <v-card-text>
            <v-row class="pa-0">
              <v-container class="pa-0 grey lighten-5">
                <v-row
                  class="pa-0"
                  v-for="(comentario, index) in comentarios"
                  :key="index"
                  no-gutters
                >
                  <v-col class="orange--text mt-1" cols="12" sm="6" md="1"
                    ><v-icon class="mr-1 mb-2">mdi-account</v-icon
                    >{{ comentario.comentarista }}
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col class="justify-start" cols="6" md="8">
                    <div class="comentario">
                      <h4 class="pa-2">
                        {{ comentario.texto }}
                      </h4>
                    </div>
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  props: ["receita"],
  data() {
    return {
      tasks: [],
      uid: "",
      nome: "",
      comentarioTexto: "",
      comentarios: [],
    };
  },
  mounted() {
    this.buscarReceitas();
    this.getComentario();
    this.getNome();
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
          comentarios: doc.data().comentarista,
          curtidas: doc.data().curtidas,
        });
      }
      console.log(this.receitas);
    },
    async getComentario() {
      await fb.db
        .collection("tasks")
        .doc(this.receita.id)
        .get()
        .then((receita) => {
          console.log(receita.data());
          this.comentarios = receita.data().comentarios;
        });
    },
    async getNome() {
      this.uid = fb.auth.currentUser.uid;
      const userProfile = await fb.profileCollection
        .where("uid", "==", this.uid)
        .get();
      this.nome = userProfile.docs[0].data().nome;
      console.log(userProfile.docs[0].data().nome);
      console.log(this.nome);
    },
    async enviarComentario() {
      this.comentarios.push({
        texto: this.comentarioTexto,
        comentarista: this.nome,
      });
      console.log(this.comentarios);
      await fb.tasksCollection.doc(this.receita.id).update({
        comentarios: this.comentarios,
      });
      console.log(this.comentarios);
      this.getComentario();
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
.comentario {
  text-align: start;
}
.buttonSend {
  margin-bottom: 10px;
  margin-right: 10px;
}
.data {
  font-size: 12px;
}
.receitaName {
  display: flex;
  justify-content: center;
}
.image {
  margin-top: 10px;
}
.receitaBox {
  text-align: start;
  border-radius: 9px;
  height: 140px;
  background-color: #e0e0e0;
}
.receitaContent {
  font-size: 20px;
  padding: 10px;
}
.timeBox {
  font-size: 20px;
  height: 50px;
  border-radius: 20px;
  background-color: #e0e0e0;
}
.timeContent {
  padding-top: 10px;
}
.precoBox {
  padding: 10px;
  text-align: start;
  height: 140px;
  border-radius: 20px;
  font-size: 20px;
  background-color: #e0e0e0;
}
</style>
