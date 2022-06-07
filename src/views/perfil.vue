<template>
  <v-container class="brown lighten-2" fill-height fluid>
    <v-card class="mx-auto my-12 orange lighten-3 rounded-xl" width="680" teste>
      <div>
        <h1 class="text-center">
          Minhas informações
          <v-icon large class="mr-2 mb-2" color="black">
            mdi-badge-account-horizontal-outline</v-icon
          >
        </h1>
      </div>
      <v-img class="" height="600" src="@/assets/images/cok.png.png"></v-img>

      <v-form class="mt-5 rounded-xl">
        <v-container fluid>
          <v-text-field label="Nome" v-model="nome"></v-text-field>
          <v-text-field label="Sobrenome" v-model="sobrenome"></v-text-field>
          <v-text-field label="Telefone" v-model="telefone"></v-text-field>
          <div class="text-center">
            <v-btn color="grey lighten-3 " @click="salvarPerfil">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      nome: "",
      sobrenome: "",
      telefone: "",
      uid: "",
      temPerfil: false,
    };
  },
  async mounted() {
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      this.temPerfil = true;
      const perfil = userProfile.docs[0];
      this.profileId = perfil.id;
      this.nome = perfil.data().nome;
      this.sobrenome = perfil.data().sobrenome;
      this.telefone = perfil.data().telefone;
    }
  },
  methods: {
    async salvarPerfil() {
      if (this.temPerfil) {
        await fb.profileCollection.doc(this.profileId).update({
          nome: this.nome,
          sobrenome: this.sobrenome,
          telefone: this.telefone,
        });
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          nome: this.nome,
          sobrenome: this.sobrenome,
          telefone: this.telefone,
        });
      }
    },
  },
};
</script>

<style>
.teste {
  background-color: black;
}
</style>
