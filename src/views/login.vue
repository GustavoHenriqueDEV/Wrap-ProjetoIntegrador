<template>
  <v-container fill-height fluid text-center class="orange lighten-2">
    <v-container>
      <v-row class="elevation-3 mx-auto, brown lighten-1 rounded-xl">
        <v-col cols="auto">
          <v-img
            class="ml-10"
            max-height="500"
            max-width="500"
            src="@/assets/images/livro.png"
          ></v-img>
        </v-col>
        <v-col>
          <h1 class="h1 orange--text">Login</h1>
          <v-form>
            <v-text-field
              solo
              orange--text
              color="orange"
              label="Email"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              solo
              orange--text
              color="orange"
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="primary" @click="login" elevation="24">Login</v-btn>
            <v-btn class="ml-2" color="warning" @click="reset" elevation="24"
              >Resetar</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      color="red"
      v-model="errorLogin"
      danger
      multi-line
      timeout="2000"
      >Usuário ou senha inválidos</v-snackbar
    >
    <v-dialog v-model="novaConta" persistent max-width="300">
      <v-card>
        <v-card-title>Conta não encontrada.</v-card-title>
        <v-card-text>
          A conta não foi localizada. Deseja criar um nova conta com os dados
          informados?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
          <v-btn color="red darken-1" text @click="novaConta = false"
            >Não</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style></style>
