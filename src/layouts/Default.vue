<template>
  <v-app>
    <v-app-bar color="orange lighten-2" absolute>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        class="ml-1"
        v-for="item of items2"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-icon>{{ item.icon }}</v-icon
        >{{ item.nome }}</v-btn
      >

      <v-autocomplete
        :items="opcao"
        class="mt-6 ml-2 mr-2"
        color="black"
        rounded
        filled
        dense
        placeholder="Pesquisar receita"
        prepend-inner-icon="mdi-magnify"
      ></v-autocomplete>

      <v-btn
        rounded
        class="ml-1"
        v-for="item of items"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-icon>{{ item.icon }}</v-icon
        >{{ item.nome }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
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

<style></style>
