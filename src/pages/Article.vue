<template>
  <v-container>
    <template v-if="article">
      <div class="text-h3 text-center">{{ article.title }}</div>
      <v-img
        :src="article.img"
        class="my-3"
        contain
        height="200"
      />
      <div v-html="article.content"/>
    </template>
  </v-container>
</template>

<script>
  export default {
    name: 'Blog',
    data() {
      return {
        article: null
      }
    },
    mounted() {
      if (localStorage.getItem('articles') && this.$router.currentRoute.params.id) {
        JSON.parse(localStorage.getItem('articles')).forEach(article => {
          if (article.id === Number(this.$router.currentRoute.params.id)) {
            this.article = article
          }
        });
        if (!this.article) {
          this.$router.push({ name: 'Blog' })
        }
      } else {
        this.$router.push({ name: 'Blog' })
      }
    }
  }
</script>

<style lang="scss">
  .article {
    cursor: pointer;
  }
</style>