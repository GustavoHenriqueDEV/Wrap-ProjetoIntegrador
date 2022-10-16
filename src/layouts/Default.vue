<template>
  <v-app>
    <v-app-bar color="orange lighten-1" absolute>
      <div class="group1">
        <v-btn
          class="ml-1"
          v-for="item of items2"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-icon>{{ item.icon }}</v-icon
          >{{ item.nome }}</v-btn
        >
      </div>

      <v-img class="logoDefault" src="../assets/images/wrap.png"></v-img>
      <div class="group2">
        <v-btn
          class="ml-1"
          v-for="item of items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-icon>{{ item.icon }}</v-icon
          >{{ item.nome }}
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="mt-10">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      opcao: ["Sopa", "caudo", "macarrão"],
      items: [
        {
          nome: "Perfil",
          title: "Perfil",
          icon: "mdi-account",
          to: "/perfil",
        },
        {
          nome: "Sair",
          title: "Saida",
          icon: "mdi-arrow-left",
          to: "/login",
        },
      ],

      items2: [
        {
          nome: "Receitas",
          title: "receitas",
          icon: "mdi-book-open-page-variant-outline",
          to: "/",
        },
        {
          nome: "Enviar receita ",
          title: "adicionar receitas",
          icon: "mdi-book-plus",
          to: "adicionarReceita",
        },
        {
          nome: "Minhas receitas",
          title: "minhas receitas",
          icon: "mdi-book-open-variant",
          to: "minhasReceitas",
        },
      ],
    };
  },
};
</script>

<style>
.group2 {
  margin-left: 500px;
}
.group1 {
  margin-left: 50px;
  margin-right: 300px;
}
.logoDefault {
  max-height: 90px;
  margin-top: 27px;
  max-width: 200px;
}
</style>
