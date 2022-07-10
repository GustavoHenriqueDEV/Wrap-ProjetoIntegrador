<template>
  <div class="d-flex fill-height">
    <v-row class="d-flex fill-height">
      <v-col
        class="d-flex justify-content-center alighn-items-center brown"
        sm="7"
        cols="12"
      >
        <div class="box-image">
          <v-img class="rounded-xl" src="@/assets/images/leal.png"></v-img>
        </div>
      </v-col>
      <v-col class="fluid col1 brown lighten-5" cols="12" sm="5">
        <h1 class="login-text h1 black--text text-center">Login</h1>
        <v-form class="mt-12">
          <v-div class="blue--text ml-2"
            >não possui uma conta?
            <v-btn
              small
              class="mb-1 novaConta"
              color="primary"
              @click="criarNovaConta"
              elevation="24"
              >Criar conta</v-btn
            >
          </v-div>
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
          <div class="d-flex">
            <v-btn
              large
              dark
              class="login black"
              color="brown"
              @keyup.enter="login"
              @click="login"
              elevation="24"
              >Login</v-btn
            >

            <v-btn large @click="recuperarSenha" dark class="d-flex forget dark"
              >Esqueci minha senha</v-btn
            >

            <v-btn
              large
              class="reset"
              dark
              color="grey"
              @click="reset"
              elevation="24"
              >Resetar</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar
      color="red"
      v-model="errorLogin"
      danger
      multi-line
      timeout="2000"
      >Usuário ou senha inválidos</v-snackbar
    >

    <v-dialog v-model="novaConta" persistent width="700">
      <v-card width="800">
        <v-card-title class="CardTitle"
          ><h1 class="h1">Criar nova conta</h1></v-card-title
        >

        <h2 class="h2 ml-3">Email:</h2>
        <v-text-field
          class="pa-3 field"
          solo
          color="orange"
          label="Email"
          v-model="user.email"
        ></v-text-field>
        <h2 class="h2 ml-3">Senha:</h2>

        <v-text-field
          class="pa-3 field"
          solo
          color="orange"
          label="Senha"
          v-model="user.password"
          :type="show ? 'text' : 'password'"
        ></v-text-field>

        <v-card-actions>
          <v-btn color="green" text @click="criarNovaConta"
            >Criar nova conta</v-btn
          >
          <v-btn color="red " text @click="novaConta = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="senha" persistent width="600">
      <v-card>
        <v-card-title
          ><h1 class="h1 margin-none">
            Enviar email de recuperação
          </h1></v-card-title
        >
        <v-card-actions>
          <v-btn color="green darken-1" text @click="recuperarSenha">Sim</v-btn>
          <v-btn color="red darken-1" text @click="senha = false">Não</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      this.novaConta = true;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>
.box-image {
  width: 950px;
  height: 800px;
  margin-left: 75px;
  margin-top: 50px;

  display: flex;
  justify-content: center;
}
.col1 {
  font-family: "Courier New", Courier, monospace;
}
.reset {
  display: flex;
  margin-left: 200px;
}
.login-text {
  margin-top: 120px;
}
.login {
  display: flex;
  margin-right: 20px;
}
.CardTitle {
  margin-left: 120px;
  font-family: "Courier New", Courier, monospace;
}
.field {
  font-family: "Courier New", Courier, monospace;
}
</style>
