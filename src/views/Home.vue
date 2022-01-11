<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height mt-4" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col :key="i" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="item.img" height="225px">
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left">
                      {{ item.title }}
                    </p>

                    <div>
                      <p
                        class="
                          ma-0
                          text-body-1
                          font-weight-bold font-italic
                          text-left
                        "
                      >
                        {{ item.text }}
                      </p>
                      <p
                        class="
                          text-caption
                          font-weight-medium font-italic
                          text-left
                        "
                      >
                        {{ item.subtext }}
                      </p>
                    </div>

                    <div class="align-self-center"></div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
    items: [
      {
        title: "Sopa de legumes",
        text: "cenoura, batata, tomate e manjericão",
        img: "https://images.aws.nestle.recipes/resized/710943f7bf83e778f7185b2c50ef538d_sopa-de-legumes-cenoura-batata-tomate-e-manjericao-receitas-nestle_1200_600.jpg",
      },
      {
        title: "",
        text: "",
        subtext: "",
        img: "",
      },
      {
        title: " ",
        text: "",
        subtext: "",
      },
      {
        title: "",
        text: "",
        subtext: "",
      },
      {
        title: "",
        text: " ",
        subtext: "",
      },
      {
        title: "",
        text: "",
        subtext: "",
      },
      {
        title: "",
        text: "",
        subtext: "",
      },
    ],
    transparent: "rgba(255, 255, 255, 0)",
  }),
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
