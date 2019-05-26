import CharacterCreatorView from "./views/CharacterCreatorView.vue"
import Home from "./views/Home.vue"
import Router from "vue-router"
import Vue from "vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/",
      alias: "/character-list",
      name: "character_list",
      component: () => import("./views/CharacterListView.vue"),
    },
    {
      path: "/dice",
      name: "dice",
      component: () => import("@/views/DiceView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/new",
      // alias: "/character-creator/new",
      name: "character_creator-new",
      /* webpackChunkName: "character_creator" */
      component: () => import("./views/CharacterCreatorView.vue"),
      // component: CharacterCreatorView,
    },
    {
      path: "/new/edit/:id",
      // alias: "/character-creator/new/edit/:id",
      props: true,
      name: "character_creator-edit",
      /* webpackChunkName: "character_creator" */
      // component: () => import("./views/CharacterCreatorView.vue"),
      component: CharacterCreatorView,
    },
  ],
})
