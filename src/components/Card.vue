<template>
  <router-link :to="{ name: 'Article', params: { id: article.id}}" class="article">
    <v-card>
      <v-img
        :src="article.img"
        class="my-3"
        contain
        height="200"
      />
      <v-card-title>{{article.title}}</v-card-title>
      <v-card-subtitle>{{article.subTitle}}</v-card-subtitle>
      <v-card-actions class="justify-end" v-if="canChange">
        <v-btn
          text
          @click.prevent="$router.push({ name: 'EditArticle', params: { id: article.id }})"
        >
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
  
        <v-btn
          text
          color="red"
          @click.prevent="dialog=true"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="400px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ article.title }}</span>
          </v-card-title>
          <v-card-text>
            <span>удалить эту статью?</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="deleteArticle()"
            >
              да
            </v-btn>
            <v-btn
              text
              @click="dialog = false"
            >
              Нет
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: 'Card',
  props: {
    article: { type: Object, require: true },
    canChange: {type: Boolean, default: false }
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    deleteArticle() {
      let articles = JSON.parse(localStorage.getItem('articles'))
      articles = articles.filter(article => article.id !== this.article.id)
      localStorage.setItem('articles', JSON.stringify(articles))
      this.$emit('deleteArticle', this.article.id)
      this.dialog = false
    }
  }
}
</script>