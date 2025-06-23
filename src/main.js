import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./styles.css"

// Importar componentes
import Login from ".//Login.vue"
import Dashboard from "./Dashboard.vue"
import PortalFamilias from "./PortalFamilias.vue"

// Configurar rutas
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/familia",
    name: "PortalFamilias",
    component: PortalFamilias,
  },
]

// Crear router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de navegación para autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("edururalUser")

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/")
  } else {
    next()
  }
})

// Crear y montar la aplicación
const app = createApp(App)
app.use(router)
app.mount("#app")
