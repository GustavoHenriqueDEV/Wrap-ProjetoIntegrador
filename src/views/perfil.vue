<template>
  <v-container class="" fill-height fluid>
    <v-card class="mx-auto grey lighten-2" height="400" width="980" teste>
      <div class="box-info">
        <h1 class="">
          Minhas informações
          <v-icon large class="ml-2 mb-1" color="black">
            mdi-badge-account-horizontal-outline</v-icon
          >
        </h1>
      </div>
      <div class="content-box">
        <div class="d-flex controll">
          <label class="label">Nome</label>
          <div class="controll">
            <input v-model="nome" class="input" type="input string email " />
          </div>
        </div>
        <v-divider class="horizontal"></v-divider>
        <div class="d-flex controll">
          <label class="label">Email</label>
          <div class="controll">
            <input
              v-model="sobrenome"
              class="input"
              type="input string email "
            />
          </div>
        </div>
        <v-divider class="horizontal"></v-divider>

        <div class="d-flex controll">
          <label class="label">TELEFONE</label>
          <div class="controll">
            <input
              v-model="telefone"
              class="input"
              type="input string email "
            />
          </div>
        </div>
      </div>

      <div class="form-btn">
        <button @click="salvarPerfil" class="btn">Salvar alterações</button>
      </div>
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
      temPerfil: false,
      uid: "",
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
.box-info {
  color: orange;
  padding: 15px;
  align-items: start;
  text-align: start;
}

.form-btn {
  margin-top: 12px;
  text-align: center;
}

.btn {
  width: 150px;
  height: 34px;
  border-radius: 20px;
  background-color: orange;
}

.controll {
  align-items: center;
  padding: 10px;
}

.input {
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  background: 0 0;
  background-color: white;
  padding: 10px 15px;
  width: 500px;
  line-height: 1.5;
}

.label {
  align-items: center;
  margin-right: 10px;
  text-transform: uppercase;
  color: #595959;
  font-size: 14px;
}
.teste {
  background-color: black;
}
</style>
