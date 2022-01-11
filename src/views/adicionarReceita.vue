<template>
  <v-container class="orange lighten-4" fill-height fluid>
    <v-container class="mt-10" text-center>
      <h1 class="h1 mb-10 orange--text">
        Enviar receita
        <v-icon large color="gray">mdi-note-edit</v-icon>
      </h1>
      <v-row class="elevation-3 mx-auto, rounded-xl">
        <v-col>
          <v-form>
            <v-text-field
              label="Nome da Receita"
              v-model="novaReceita"
              @keydown.enter="adicionar"
              class="mt-4 ml-7 mr-2"
              rounded
              solo
              dense
              placeholder="Nome da receita"
              @click="adicionar"
            >
            </v-text-field>
          </v-form>

          <template>
            <v-file-input
              label="Adicionar imagem da receita"
              filled
              prepend-icon="mdi-camera"
              orange
              solo
              color="grey "
            ></v-file-input>
          </template>
          <v-divider></v-divider>
          <v-div>
            <h2 class="h2 mt-2 orange--text">
              <v-icon>mdi-noodles</v-icon>Igredientes
            </h2>
          </v-div>
          <v-textarea
            solo
            color="black"
            auto-grow
            name="input-7-4"
            label="Escreva cada ingrediente por linha.Exemplo: 4x ovos "
          ></v-textarea>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="mt-6">
          <v-div class="orange--text"
            ><h2 class="h2">Tempo de preparo</h2></v-div
          >
          <v-row>
            <v-text-field
              prepend-inner-icon="mdi-timer"
              rounded
              filled
              solo
              class="mt-4 mr-2 ml-2"
              label="Hora"
            ></v-text-field>
            <h1 class="mt-4">:</h1>
            <v-text-field
              prepend-inner-icon="mdi-timer"
              rounded
              solo
              filled
              class="mt-4 mr-2 ml-2"
              label="Minutos"
            ></v-text-field>
          </v-row>
          <v-divider></v-divider>

          <v-div>
            <h2 class="h2 orange--text">
              <v-icon class="gray">mdi-food-takeout-box</v-icon>
              Modo de preparo
            </h2>
            <v-textarea
              class="mt-3"
              solo
              color="black"
              auto-grow
              name="input-7-4"
              label="Descreva os passos por linha.  "
            ></v-textarea>
          </v-div>
          <v-btn block rounded color="orange">Enviar receita</v-btn>
        </v-col>
        <v-col>
          <v-img src="@/assets/images/Frigideira.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novaReceita: "",
      tarefas: [],
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscarTarefasDoServidor();
  },
  methods: {
    async buscarTarefasDoServidor() {
      this.tarefas = [];
      const logTasks = await fb.tasksCollection
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
        });
      }
    },
    async adicionar() {
      await fb.tasksCollection.add({
        titulo: this.novaReceita,
        dataGravacao: new Date().toISOString().slice(0, 10),
        owner: this.uid,
      });
      this.novaReceita = "";
      this.buscarTarefasDoServidor();
    },
  },
};
</script>

<style></style>
