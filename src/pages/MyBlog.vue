<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn class="my-4" @click="$router.push({ name: 'EditArticle', params: { id: 'new' }})">
          Добавить статью
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-for="article in articles" :key="article.id">
        <Card :article="article" canChange @deleteArticle="deleteArticle($event)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Card from '@/components/Card.vue'
  export default {
    name: 'MyBlog',
    components: { Card },
    data() {
      return {
        articles: []
      }
    },
    methods: {
      deleteArticle(id) {
        this.articles = this.articles.filter(article => article.id !== id)
      }
    },
    mounted() {
      if (localStorage.getItem('articles') && localStorage.getItem('user')) {
        JSON.parse(localStorage.getItem('articles')).forEach(article => {
          if (article.author === localStorage.getItem('user')) {
            this.articles.push(article)
          }
        });
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