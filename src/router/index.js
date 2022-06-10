import Vue from "vue";
import VueRouter from "vue-router";
import Blog from "@/pages/Blog.vue";
import MyBlog from "@/pages/MyBlog.vue";
import EditArticle from "@/pages/EditArticle.vue";
import Article from "@/pages/Article.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/my_blog",
    name: 'MyBlog',
    component: MyBlog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/my_blog/:id",
    name: 'EditArticle',
    component: EditArticle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: 'Blog',
    component: Blog
  },
  {
    path: "/blog/:id",
    name: 'Article',
    component: Article,
    props: true
  },
  {
    path: "*",
    redirect: { name: 'Blog' },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !localStorage.getItem('user')) {
    next({ name: 'Blog' });
  } else {
    next();
  }
});
export default router;
