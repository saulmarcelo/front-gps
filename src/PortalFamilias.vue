<script setup>
import { ref, computed } from 'vue'
import { 
Search, User, GraduationCap, Calendar, BookOpen, 
TrendingUp, Clock, MessageSquare, Bell, Phone, 
Mail, MapPin, Award, Heart, Star, CheckCircle,
AlertCircle, X, Eye, EyeOff
} from 'lucide-vue-next'

// Estado reactivo
const searchRut = ref('')
const studentData = ref(null)
const isLoading = ref(false)
const showPassword = ref(false)
const accessPassword = ref('')
const isAuthenticated = ref(false)

// Datos de ejemplo de estudiantes
const studentsDatabase = {
  '12.345.678-9': {
    id: 1,
    name: 'María González Pérez',
    rut: '12.345.678-9',
    grade: '5° Básico',
    school: 'Escuela Rural Los Aromos',
    teacher: 'Prof. Carmen Silva',
    photo: '/placeholder.svg?height=120&width=120',
    guardian: 'Carmen Pérez',
    relationship: 'Madre',
    lastGrades: [
      { subject: 'Matemáticas', grade: 6.2, date: '2024-01-15', color: 'text-green-600' },
      { subject: 'Lenguaje', grade: 5.8, date: '2024-01-14', color: 'text-yellow-600' },
      { subject: 'Ciencias', grade: 6.5, date: '2024-01-13', color: 'text-green-600' },
      { subject: 'Historia', grade: 6.0, date: '2024-01-12', color: 'text-green-600' }
    ],
    attendance: { 
      percentage: 90, 
      thisWeek: 4, 
      total: 5,
      thisMonth: 18,
      totalMonth: 20
    },
    nextActivities: [
      { 
        subject: 'Matemáticas', 
        title: 'Examen Fracciones', 
        date: '2024-01-20',
        type: 'Evaluación',
        description: 'Evaluación sumativa sobre fracciones básicas'
      },
      { 
        subject: 'Lenguaje', 
        title: 'Ensayo Comprensión', 
        date: '2024-01-22',
        type: 'Tarea',
        description: 'Ensayo sobre comprensión lectora'
      },
      { 
        subject: 'Ciencias', 
        title: 'Proyecto El Agua', 
        date: '2024-01-25',
        type: 'Proyecto',
        description: 'Presentación sobre el ciclo del agua'
      }
    ],
    messages: [
      { 
        from: 'Prof. Carmen Silva', 
        subject: 'Excelente progreso en matemáticas',
        message: 'María ha mostrado excelente progreso en matemáticas. Felicitaciones por el apoyo en casa.', 
        date: '2024-01-15',
        read: false
      },
      { 
        from: 'Dirección', 
        subject: 'Reunión de apoderados',
        message: 'Recordamos la reunión de apoderados el próximo viernes 19 de enero a las 19:00 hrs.', 
        date: '2024-01-14',
        read: true
      }
    ],
    academicProgress: {
      mathematics: { grade: 6.2, trend: 'up', progress: 85 },
      language: { grade: 5.8, trend: 'stable', progress: 72 },
      science: { grade: 6.5, trend: 'up', progress: 92 },
      history: { grade: 6.0, trend: 'stable', progress: 78 }
    },
    behaviorNotes: [
      { date: '2024-01-15', note: 'Excelente participación en clase', type: 'positive' },
      { date: '2024-01-10', note: 'Ayudó a compañero con dificultades', type: 'positive' }
    ]
  },
  '12.345.679-7': {
    id: 2,
    name: 'Pedro Martínez López',
    rut: '12.345.679-7',
    grade: '6° Básico',
    school: 'Escuela Básica Río Claro',
    teacher: 'Prof. Miguel Torres',
    photo: '/placeholder.svg?height=120&width=120',
    guardian: 'Luis Martínez',
    relationship: 'Padre',
    lastGrades: [
      { subject: 'Historia', grade: 6.2, date: '2024-01-15', color: 'text-green-600' },
      { subject: 'Matemáticas', grade: 5.5, date: '2024-01-14', color: 'text-yellow-600' },
      { subject: 'Lenguaje', grade: 6.0, date: '2024-01-13', color: 'text-green-600' },
      { subject: 'Ciencias', grade: 5.8, date: '2024-01-12', color: 'text-yellow-600' }
    ],
    attendance: { 
      percentage: 80, 
      thisWeek: 3, 
      total: 5,
      thisMonth: 16,
      totalMonth: 20
    },
    nextActivities: [
      { 
        subject: 'Historia', 
        title: 'Pueblos Originarios', 
        date: '2024-01-21',
        type: 'Investigación',
        description: 'Investigación sobre pueblos originarios de Chile'
      },
      { 
        subject: 'Matemáticas', 
        title: 'Geometría Básica', 
        date: '2024-01-23',
        type: 'Tarea',
        description: 'Ejercicios de geometría básica'
      }
    ],
    messages: [
      { 
        from: 'Prof. Miguel Torres', 
        subject: 'Refuerzo en matemáticas',
        message: 'Pedro necesita refuerzo en matemáticas. Sugiero práctica adicional en casa.', 
        date: '2024-01-14',
        read: false
      }
    ],
    academicProgress: {
      mathematics: { grade: 5.5, trend: 'down', progress: 65 },
      language: { grade: 6.0, trend: 'up', progress: 78 },
      science: { grade: 5.8, trend: 'stable', progress: 70 },
      history: { grade: 6.2, trend: 'up', progress: 88 }
    },
    behaviorNotes: [
      { date: '2024-01-12', note: 'Necesita mejorar atención en clase', type: 'attention' }
    ]
  }
}

// Función para buscar estudiante
const searchStudent = async () => {
  if (!searchRut.value.trim()) {
    alert('Por favor ingrese un RUT')
    return
  }

  isLoading.value = true
  
  // Simular búsqueda en base de datos
  setTimeout(() => {
    const student = studentsDatabase[searchRut.value.trim()]
    if (student) {
      studentData.value = student
    } else {
      studentData.value = null
      alert('No se encontró información para el RUT ingresado')
    }
    isLoading.value = false
  }, 1000)
}

// Función para autenticar acceso
const authenticateAccess = () => {
  // Simulación simple de autenticación
  if (accessPassword.value === '123456') {
    isAuthenticated.value = true
  } else {
    alert('Contraseña incorrecta')
  }
}

// Función para limpiar búsqueda
const clearSearch = () => {
  searchRut.value = ''
  studentData.value = null
}

// Función para formatear RUT mientras se escribe
const formatRut = () => {
  let rut = searchRut.value.replace(/[^0-9kK]/g, '')
  if (rut.length > 1) {
    rut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1)
  }
  searchRut.value = rut
}

// Función para marcar mensaje como leído
const markAsRead = (messageIndex) => {
  studentData.value.messages[messageIndex].read = true
}

// Computed para mensajes no leídos
const unreadMessages = computed(() => {
  if (!studentData.value) return 0
  return studentData.value.messages.filter(msg => !msg.read).length
})

// Computed para próximas actividades urgentes
const urgentActivities = computed(() => {
  if (!studentData.value) return []
  const today = new Date()
  const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000))
  
  return studentData.value.nextActivities.filter(activity => {
    const activityDate = new Date(activity.date)
    return activityDate <= threeDaysFromNow && activityDate >= today
  })
})
</script>

<template>
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
  <!-- Header del Portal Familias -->
  <header class="backdrop-blur-xl bg-white/90 border-b border-blue-200/50 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Portal Familias</h1>
            <p class="text-xs text-gray-600">EduRural - Ministerio de Educación</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div v-if="studentData" class="flex items-center space-x-2 text-sm text-gray-600">
            <User class="w-4 h-4" />
            <span>{{ studentData.guardian }} ({{ studentData.relationship }})</span>
          </div>
          <button 
            v-if="studentData"
            @click="clearSearch"
            class="text-gray-600 hover:text-gray-800 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-6 py-8">

      <!-- Buscador de estudiante -->
      <div v-if="!studentData" class="max-w-2xl mx-auto">
        <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl animate-slide-in-from-top">
          <div class="p-8 text-center">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Search class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Buscar Información del Estudiante</h2>
            <p class="text-gray-600 mb-8">Ingrese el RUT del estudiante para ver su información académica</p>
            
            <div class="space-y-4">
              <div class="relative">
                <input 
                  v-model="searchRut" 
                  @input="formatRut"
                  type="text" 
                  placeholder="Ej: 12.345.678-9"
                  maxlength="12"
                  class="w-full border border-gray-300 rounded-xl px-4 py-4 text-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  @keyup.enter="searchStudent">
                <Search class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button 
                @click="searchStudent"
                :disabled="isLoading || !searchRut.trim()"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="isLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Buscando...
                </span>
                <span v-else>Buscar Estudiante</span>
              </button>
            </div>
            
            <div class="mt-8 p-6 bg-green-50 rounded-xl">
              <h3 class="font-semibold text-green-800 mb-2">RUTs de ejemplo para probar:</h3>
              <div class="space-y-1 text-sm text-green-700">
                <p><strong>12.345.678-9</strong> - María González Pérez (5° Básico)</p>
                <p><strong>12.345.679-7</strong> - Pedro Martínez López (6° Básico)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información del estudiante -->
      <div v-else class="space-y-8 animate-slide-in-from-bottom">
        <!-- Header del estudiante -->
        <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-6">
            <div class="flex items-start gap-6">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <User class="w-12 h-12 text-white" />
              </div>
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ studentData.name }}</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <GraduationCap class="w-4 h-4" />
                    <span>{{ studentData.grade }} - {{ studentData.school }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <User class="w-4 h-4" />
                    <span>Profesor: {{ studentData.teacher }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <MapPin class="w-4 h-4" />
                    <span>RUT: {{ studentData.rut }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Heart class="w-4 h-4" />
                    <span>Apoderado: {{ studentData.guardian }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Alertas importantes -->
              <div class="flex flex-col gap-2">
                <div v-if="unreadMessages > 0" class="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm">
                  <Bell class="w-4 h-4" />
                  <span>{{ unreadMessages }} mensaje{{ unreadMessages > 1 ? 's' : '' }} nuevo{{ unreadMessages > 1 ? 's' : '' }}</span>
                </div>
                <div v-if="urgentActivities.length > 0" class="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg text-sm">
                  <Clock class="w-4 h-4" />
                  <span>{{ urgentActivities.length }} actividad{{ urgentActivities.length > 1 ? 'es' : '' }} próxima{{ urgentActivities.length > 1 ? 's' : '' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen rápido -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp class="w-6 h-6 text-white" />
            </div>
            <div class="text-2xl font-bold text-gray-800">{{ (studentData.lastGrades.reduce((sum, grade) => sum + grade.grade, 0) / studentData.lastGrades.length).toFixed(1) }}</div>
            <div class="text-sm text-gray-600">Promedio General</div>
          </div>

          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle class="w-6 h-6 text-white" />
            </div>
            <div class="text-2xl font-bold text-gray-800">{{ studentData.attendance.percentage }}%</div>
            <div class="text-sm text-gray-600">Asistencia</div>
          </div>

          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen class="w-6 h-6 text-white" />
            </div>
            <div class="text-2xl font-bold text-gray-800">{{ studentData.nextActivities.length }}</div>
            <div class="text-sm text-gray-600">Actividades Pendientes</div>
          </div>

          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageSquare class="w-6 h-6 text-white" />
            </div>
            <div class="text-2xl font-bold text-gray-800">{{ studentData.messages.length }}</div>
            <div class="text-sm text-gray-600">Mensajes</div>
          </div>
        </div>

        <!-- Contenido principal en grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Columna izquierda: Notas y Progreso -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Últimas calificaciones -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Award class="w-4 h-4 text-white" />
                  </div>
                  Últimas Calificaciones
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(grade, index) in studentData.lastGrades" :key="index" 
                       class="flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-blue-100">
                    <div>
                      <p class="font-semibold text-gray-800">{{ grade.subject }}</p>
                      <p class="text-sm text-gray-600">{{ grade.date }}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold" :class="grade.color">{{ grade.grade }}</div>
                      <div class="text-xs text-gray-500">Nota</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progreso por asignatura -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp class="w-4 h-4 text-white" />
                  </div>
                  Progreso Académico
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-6">
                  <div v-for="(subject, key) in studentData.academicProgress" :key="key" 
                       class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-800 capitalize">
                        {{ key === 'mathematics' ? 'Matemáticas' : key === 'language' ? 'Lenguaje' : key === 'science' ? 'Ciencias' : 'Historia' }}
                      </span>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-lg" :class="subject.grade >= 6.0 ? 'text-green-600' : subject.grade >= 5.0 ? 'text-yellow-600' : 'text-red-600'">
                          {{ subject.grade }}
                        </span>
                        <TrendingUp v-if="subject.trend === 'up'" class="w-4 h-4 text-green-500" />
                        <div v-else-if="subject.trend === 'stable'" class="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div v-else class="w-4 h-4 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="h-2 rounded-full transition-all duration-1000 ease-out" 
                           :class="subject.progress >= 80 ? 'bg-green-500' : subject.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'"
                           :style="{ width: `${subject.progress}%` }"></div>
                    </div>
                    <div class="text-xs text-gray-500">Progreso: {{ subject.progress }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Actividades y Mensajes -->
          <div class="space-y-8">
            <!-- Asistencia -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <CheckCircle class="w-4 h-4 text-white" />
                  </div>
                  Asistencia
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <div class="text-center">
                  <div class="text-3xl font-bold" :class="studentData.attendance.percentage >= 85 ? 'text-green-600' : 'text-red-600'">
                    {{ studentData.attendance.percentage }}%
                  </div>
                  <div class="text-sm text-gray-600">Asistencia General</div>
                </div>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Esta semana:</span>
                    <span class="font-medium">{{ studentData.attendance.thisWeek }}/{{ studentData.attendance.total }} días</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Este mes:</span>
                    <span class="font-medium">{{ studentData.attendance.thisMonth }}/{{ studentData.attendance.totalMonth }} días</span>
                  </div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="h-3 rounded-full transition-all duration-1000 ease-out" 
                       :class="studentData.attendance.percentage >= 85 ? 'bg-green-500' : 'bg-red-500'"
                       :style="{ width: `${studentData.attendance.percentage}%` }"></div>
                </div>
              </div>
            </div>

            <!-- Próximas actividades -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar class="w-4 h-4 text-white" />
                  </div>
                  Próximas Actividades
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(activity, index) in studentData.nextActivities" :key="index" 
                       class="p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-blue-100">
                    <div class="flex items-start justify-between mb-2">
                      <h4 class="font-semibold text-gray-800">{{ activity.title }}</h4>
                      <span class="text-xs px-2 py-1 rounded-full"
                            :class="activity.type === 'Evaluación' 
                              ? 'bg-red-100 text-red-700' 
                              : activity.type === 'Proyecto' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-blue-100 text-blue-700'">
                        {{ activity.type }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ activity.subject }}</p>
                    <p class="text-xs text-gray-500 mb-2">{{ activity.description }}</p>
                    <div class="flex items-center gap-2 text-sm">
                      <Calendar class="w-4 h-4 text-gray-400" />
                      <span class="text-gray-600">{{ activity.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mensajes -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <MessageSquare class="w-4 h-4 text-white" />
                  </div>
                  Mensajes
                  <span v-if="unreadMessages > 0" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {{ unreadMessages }}
                  </span>
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="(message, index) in studentData.messages" :key="index" 
                       class="p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md"
                       :class="message.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'"
                       @click="markAsRead(index)">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <h4 class="font-semibold text-gray-800">{{ message.from }}</h4>
                        <div v-if="!message.read" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span class="text-xs text-gray-500">{{ message.date }}</span>
                    </div>
                    <h5 class="font-medium text-gray-700 mb-1">{{ message.subject }}</h5>
                    <p class="text-sm text-gray-600">{{ message.message }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Observaciones de comportamiento -->
            <div v-if="studentData.behaviorNotes.length > 0" class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Star class="w-4 h-4 text-white" />
                  </div>
                  Observaciones
                </h2>
              </div>
              <div class="p-6">
                <div class="space-y-3">
                  <div v-for="(note, index) in studentData.behaviorNotes" :key="index" 
                       class="p-3 rounded-lg"
                       :class="note.type === 'positive' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'">
                    <div class="flex items-center gap-2 mb-1">
                      <CheckCircle v-if="note.type === 'positive'" class="w-4 h-4 text-green-500" />
                      <AlertCircle v-else class="w-4 h-4 text-yellow-500" />
                      <span class="text-xs text-gray-500">{{ note.date }}</span>
                    </div>
                    <p class="text-sm" :class="note.type === 'positive' ? 'text-green-700' : 'text-yellow-700'">
                      {{ note.note }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Animaciones personalizadas */
@keyframes slide-in-from-top {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-from-bottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-from-top {
  animation: slide-in-from-top 0.5s ease-out;
}

.animate-slide-in-from-bottom {
  animation: slide-in-from-bottom 0.5s ease-out;
}

/* Efectos hover */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.hover\:-translate-y-0\.5:hover {
  transform: translateY(-0.125rem);
}

/* Transiciones suaves */
button,
.card,
.hover-effect {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>