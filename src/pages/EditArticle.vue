<template>
  <v-container>
    <v-form
      @submit.prevent="submit"
      v-model="valid"
    >
      <v-text-field
        v-model="article.title"
        label="Заголовок"
        :rules="[v => !!v || 'Поле обязательно для заполнения']"
        required
      ></v-text-field>
      <v-text-field
        v-model="article.subTitle"
        label="Короткое описание"
        required
      ></v-text-field>
      <v-text-field
        v-model="article.img"
        label="Ссылка на фото"
        :rules="[v => !!v || 'Поле обязательно для заполнения']"
        required
      ></v-text-field>
      <v-text-field
        v-model="article.content"
        label="Контент"
        :rules="[v => !!v || 'Поле обязательно для заполнения']"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        type="submit"
      >
        Сохранить
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: 'EditArticle',
    data() {
      return {
        article: {
          title: null,
          subTitle: null,
          img: null,
          content: null
        },
        articles: [],
        valid: false,
      }
    },
    methods: {
      submit() {
        if (this.$router.currentRoute.params.id === 'new') {
          this.articles.push({
            title: this.article.title,
            subTitle: this.article.subTitle,
            img: this.article.img,
            content: this.article.content,
            id: Number(new Date()),
            author: localStorage.getItem('user')
          })
        } else {
          this.articles.forEach(article => {
            if (article.id === Number(this.$router.currentRoute.params.id)) {
              article.title = this.article.title
              article.subTitle = this.article.subTitle
              article.img = this.article.img
              article.content = this.article.content
            }
          });
        }
        localStorage.setItem('articles', JSON.stringify(this.articles))
        this.$router.push({ name: 'MyBlog' })
      }
    },
    mounted() {
      if (localStorage.getItem('articles') && this.$router.currentRoute.params.id) {
        this.articles = JSON.parse(localStorage.getItem('articles'))
        this.articles.forEach(article => {
          if (article.id === Number(this.$router.currentRoute.params.id)) {
            this.article = article
            console.log(this.article);
          }
        });
      } else {
        this.$router.push({ name: 'Blog' })
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