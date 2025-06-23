<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GraduationCap, User, Lock, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()

const loginForm = ref({
  email: '',
  password: '',
  userType: 'admin'
})

const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

// Usuarios demo
const users = {
  'admin@edurural.cl': {
    password: 'admin123',
    type: 'admin',
    name: 'Administrador Sistema',
    role: 'Administrador',
    redirect: '/dashboard'
  },
  'familia@demo.cl': {
    password: 'familia123', 
    type: 'family',
    name: 'Portal Familias',
    role: 'Apoderado',
    redirect: '/familia'
  }
}

const handleLogin = () => {
  loginError.value = ''
  
  if (!loginForm.value.email || !loginForm.value.password) {
    loginError.value = 'Complete todos los campos'
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    const user = users[loginForm.value.email.toLowerCase()]
    
    if (!user || user.password !== loginForm.value.password) {
      loginError.value = 'Credenciales incorrectas'
      isLoading.value = false
      return
    }
    
    // Guardar usuario en localStorage
    localStorage.setItem('edururalUser', JSON.stringify({
      ...user,
      email: loginForm.value.email,
      loginTime: new Date().toISOString()
    }))
    
    // Redirigir
    router.push(user.redirect)
    isLoading.value = false
  }, 1000)
}

const selectUserType = (type) => {
  loginForm.value.userType = type
  if (type === 'admin') {
    loginForm.value.email = 'admin@edurural.cl'
    loginForm.value.password = 'admin123'
  } else if (type === 'family') {
    loginForm.value.email = 'familia@demo.cl'
    loginForm.value.password = 'familia123'
  }
}
</script>

<template>
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <GraduationCap class="w-8 h-8 text-white" />
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-2">EduRural</h1>
      <p class="text-gray-600">Sistema de Gestión Educativa</p>
    </div>

    <!-- Selección de tipo de usuario -->
    <div class="bg-white/90 border border-blue-100 rounded-2xl p-6 mb-6 shadow-xl">
      <h3 class="font-semibold text-gray-800 mb-4">Tipo de Usuario</h3>
      <div class="grid grid-cols-2 gap-3">
        <button 
          @click="selectUserType('admin')"
          :class="loginForm.userType === 'admin' ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'"
          class="p-3 rounded-lg border-2 transition-all hover:scale-105">
          <div class="text-sm font-medium">Dashboard</div>
          <div class="text-xs text-gray-600">Administración</div>
        </button>
        <button 
          @click="selectUserType('family')"
          :class="loginForm.userType === 'family' ? 'bg-purple-100 border-purple-300' : 'bg-gray-50 border-gray-200'"
          class="p-3 rounded-lg border-2 transition-all hover:scale-105">
          <div class="text-sm font-medium">Familias</div>
          <div class="text-xs text-gray-600">Portal Padres</div>
        </button>
      </div>
    </div>

    <!-- Formulario de login -->
    <div class="bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
      <div class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div class="relative">
              <input 
                v-model="loginForm.email"
                type="email" 
                placeholder="usuario@edurural.cl"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required>
              <User class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input 
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Contraseña"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required>
              <Lock class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="loginError" class="text-red-600 text-sm text-center">
            {{ loginError }}
          </div>

          <!-- Botón de login -->
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50">
            <span v-if="isLoading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <!-- Demo info -->
        <div class="mt-6 p-4 bg-blue-50 rounded-xl">
          <p class="text-sm text-blue-700 text-center">
            <strong>Demo:</strong> Selecciona un tipo de usuario para autocompletar
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
