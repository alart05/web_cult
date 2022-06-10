<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="article in articles" :key="article.id">
        <Card :article="article"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Card from '@/components/Card.vue'
  export default {
    name: 'Blog',
    components: { Card },
    data() {
      return {
        articles: []
      }
    },
    mounted() {
      if (localStorage.getItem('articles')) {
        this.articles = JSON.parse(localStorage.getItem('articles'))
      }
    }
  }
</script>

<style lang="scss">
  .article {
    cursor: pointer;
    text-decoration: none;
  }
</style>