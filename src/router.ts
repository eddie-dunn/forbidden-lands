import Home from "./views/Home.vue"
import Router from "vue-router"
import Vue from "vue"

Vue.use(Router)

function characterEditorRoutes() {
  return [
    {
      path: "/new",
      // alias: "/character-creator/new",
      name: "character_creator-new",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
    {
      path: "/new/edit/:id",
      // alias: "/character-creator/new/edit/:id",
      props: true,
      name: "character_creator-edit-new",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
    {
      path: "/active/edit/:id",
      props: true,
      name: "character_creator-active-edit",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
    {
      path: "/active/view/:id",
      props: (route: any) => ({ id: route.params.id, fromRoute: route }),
      name: "character_creator-active-view",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
    {
      path: "/new/template/edit",
      props: (route: any) => ({ templateQueryData: route.query }),
      name: "character_creator-template-edit",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
    {
      path: "/multiplayer/view/:peerId/:charId",
      props: (route: any) => ({
        id: route.params.charId,
        peerId: route.params.peerId,
        fromRoute: route,
        multiplayer: true,
      }),
      name: "character-editor-mp-view",
      component: () => import("./views/CharacterCreatorView.vue"),
    },
  ]
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/multiplayer",
      alias: "/m",
      name: "multiplayer",
      component: () => import("./views/MultiplayerView.vue"),
    },
    {
      path: "/",
      alias: ["/character-list", "/index.html"],
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
      path: "/new/template",
      props: true,
      name: "character_creator-template",
      component: () => import("./views/CharacterTemplateView.vue"),
    },
    ...characterEditorRoutes(),
    {
      path: "/sandbox",
      name: "sandbox",
      component: () => import("./views/Sandbox.vue"),
    },
  ],
})
