<script setup>
import { ref, computed } from 'vue'
import { 
  Home, Users, School, GraduationCap, BookOpen, 
  ClipboardCheck, UserCheck, FileText, Wifi, 
  Eye, Settings, Menu, X, ChevronRight, Download,
  Upload, CheckCircle, AlertCircle, Calendar,
  BarChart3, PieChart, TrendingUp, Clock,
  WifiOff, RefreshCw, Star, MessageSquare, Plus,
  Search, Filter, Bell, HelpCircle, User, MapPin,
  Phone, Mail, Edit, Trash2, Heart, Award
} from 'lucide-vue-next'

const currentView = ref('dashboard')
const sidebarOpen = ref(false)
const isOnline = ref(true)
const syncStatus = ref('synced') // 'synced', 'syncing', 'pending'
const showHelp = ref(false)

// Estados para formularios
const showAddSchoolForm = ref(false)
const showAddTeacherForm = ref(false)
const showAttendanceForm = ref(false)
const showActivityForm = ref(false)
const showReportForm = ref(false)

// Formularios reactivos
const newSchool = ref({
  name: '',
  location: '',
  address: '',
  director: '',
  phone: '',
  email: '',
  founded: ''
})

const newTeacher = ref({
  name: '',
  rut: '',
  school: '',
  subjects: [],
  courses: [],
  phone: '',
  email: '',
  experience: ''
})

const newActivity = ref({
  title: '',
  subject: '',
  description: '',
  dueDate: '',
  course: ''
})

const attendanceForm = ref({
  school: '',
  course: '',
  date: new Date().toISOString().split('T')[0],
  students: []
})

const menuItems = [
  { id: 'dashboard', name: 'Panel Principal', icon: Home, description: 'Vista general del sistema' },
  { id: 'schools', name: 'Escuelas y Docentes', icon: School, description: 'Registro de instituciones' },
  { id: 'students', name: 'Fichas de Estudiantes', icon: GraduationCap, description: 'Datos y rendimiento' },
  { id: 'activities', name: 'Carga de Actividades', icon: BookOpen, description: 'Crear y asignar tareas' },
  { id: 'attendance', name: 'Asistencia', icon: UserCheck, description: 'Control de asistencia' },
  { id: 'progress', name: 'Progreso Académico', icon: TrendingUp, description: 'Monitoreo en tiempo real' },
  { id: 'reports', name: 'Reportes', icon: FileText, description: 'Informes por curso y región' },
  { id: 'sync', name: 'Sincronización', icon: Wifi, description: 'Gestión offline/online' },
  { id: 'families', name: 'Portal Familias', icon: Eye, description: 'Vista para padres' },
  { id: 'users', name: 'Usuarios', icon: Settings, description: 'Administración de accesos' }
]

const currentMenuItem = computed(() => 
  menuItems.find(item => item.id === currentView.value)
)

const setCurrentView = (viewId) => {
  currentView.value = viewId
  sidebarOpen.value = false
}

// Función para simular sincronización
const syncData = () => {
  syncStatus.value = 'syncing'
  setTimeout(() => {
    syncStatus.value = 'synced'
  }, 2000)
}

// Datos expandidos según el enunciado
const stats = {
  schools: 24,
  teachers: 156,
  students: 1247,
  activities: 89,
  pendingGrades: 23,
  avgAttendance: 87.5,
  offlineSchools: 3,
  pendingSync: 8,
  avgProgress: 6.1
}

const recentActivities = [
  { 
    school: 'Escuela Rural Los Aromos', 
    teacher: 'Prof. Carmen Silva',
    activity: 'Matemáticas - Fracciones', 
    date: '2024-01-15',
    students: 25,
    completed: 18,
    status: 'En progreso'
  },
  { 
    school: 'Escuela Básica Río Claro', 
    teacher: 'Prof. Miguel Torres',
    activity: 'Lenguaje - Comprensión Lectora', 
    date: '2024-01-14',
    students: 30,
    completed: 28,
    status: 'Completada'
  },
  { 
    school: 'Escuela Valle Verde', 
    teacher: 'Prof. Ana Morales',
    activity: 'Ciencias - El Agua', 
    date: '2024-01-13',
    students: 22,
    completed: 15,
    status: 'En progreso'
  }
]

const schools = [
  { 
    id: 1,
    name: 'Escuela Rural Los Aromos', 
    location: 'Temuco', 
    address: 'Camino Rural Km 15, Temuco',
    students: 45, 
    teachers: 6, 
    connectivity: 'Baja',
    lastSync: '2024-01-15 14:30',
    status: 'Activa',
    director: 'María González',
    phone: '+56 9 8765 4321',
    email: 'direccion@losaromas.cl',
    founded: '1985'
  },
  { 
    id: 2,
    name: 'Escuela Básica Río Claro', 
    location: 'Valdivia', 
    address: 'Av. Principal 456, Río Claro',
    students: 67, 
    teachers: 8, 
    connectivity: 'Media',
    lastSync: '2024-01-15 15:45',
    status: 'Activa',
    director: 'Pedro Martínez',
    phone: '+56 9 7654 3210',
    email: 'direccion@rioclaro.cl',
    founded: '1978'
  },
  { 
    id: 3,
    name: 'Escuela Valle Verde', 
    location: 'Osorno', 
    address: 'Sector Valle Verde s/n, Osorno',
    students: 52, 
    teachers: 7, 
    connectivity: 'Baja',
    lastSync: '2024-01-14 16:20',
    status: 'Offline',
    director: 'Ana Silva',
    phone: '+56 9 6543 2109',
    email: 'direccion@valleverde.cl',
    founded: '1992'
  }
]

const teachers = [
  {
    id: 1,
    name: 'Carmen Silva Rodríguez',
    rut: '12.345.678-9',
    school: 'Escuela Rural Los Aromos',
    subjects: ['Matemáticas', 'Ciencias'],
    courses: ['4° Básico', '5° Básico'],
    phone: '+56 9 8765 4321',
    email: 'carmen.silva@losaromas.cl',
    experience: '15 años',
    status: 'Activo',
    lastLogin: '2024-01-15 09:30'
  },
  {
    id: 2,
    name: 'Miguel Torres Pérez',
    rut: '11.234.567-8',
    school: 'Escuela Básica Río Claro',
    subjects: ['Lenguaje', 'Historia'],
    courses: ['5° Básico', '6° Básico'],
    phone: '+56 9 7654 3210',
    email: 'miguel.torres@rioclaro.cl',
    experience: '12 años',
    status: 'Activo',
    lastLogin: '2024-01-15 08:45'
  },
  {
    id: 3,
    name: 'Ana Morales González',
    rut: '13.456.789-0',
    school: 'Escuela Valle Verde',
    subjects: ['Ciencias', 'Matemáticas'],
    courses: ['4° Básico'],
    phone: '+56 9 6543 2109',
    email: 'ana.morales@valleverde.cl',
    experience: '8 años',
    status: 'Activo',
    lastLogin: '2024-01-14 16:20'
  }
]

// Fichas detalladas de estudiantes
const studentProfiles = [
  {
    id: 1,
    name: 'María González Pérez',
    rut: '12.345.678-9',
    grade: '5° Básico',
    school: 'Escuela Rural Los Aromos',
    birthDate: '2013-03-15',
    address: 'Camino Rural Km 12, Temuco',
    guardian: 'Carmen Pérez (Madre)',
    phone: '+56 9 8765 4321',
    attendance: { present: 18, total: 20, percentage: 90 },
    academicProgress: {
      mathematics: { grade: 6.2, trend: 'up' },
      language: { grade: 5.8, trend: 'stable' },
      science: { grade: 6.5, trend: 'up' },
      history: { grade: 6.0, trend: 'stable' }
    },
    recentActivities: [
      { subject: 'Matemáticas', title: 'Fracciones', status: 'Completada', grade: 6.2 },
      { subject: 'Lenguaje', title: 'Comprensión Lectora', status: 'Pendiente', grade: null }
    ],
    observations: 'Estudiante destacada en matemáticas. Necesita refuerzo en comprensión lectora.'
  },
  {
    id: 2,
    name: 'Pedro Martínez López',
    rut: '12.345.679-7',
    grade: '6° Básico',
    school: 'Escuela Básica Río Claro',
    birthDate: '2012-07-22',
    address: 'Villa Los Aromos 123, Valdivia',
    guardian: 'Luis Martínez (Padre)',
    phone: '+56 9 7654 3210',
    attendance: { present: 16, total: 20, percentage: 80 },
    academicProgress: {
      mathematics: { grade: 5.5, trend: 'down' },
      language: { grade: 6.0, trend: 'up' },
      science: { grade: 5.8, trend: 'stable' },
      history: { grade: 6.2, trend: 'up' }
    },
    recentActivities: [
      { subject: 'Historia', title: 'Pueblos Originarios', status: 'Completada', grade: 6.2 },
      { subject: 'Matemáticas', title: 'Geometría', status: 'En progreso', grade: null }
    ],
    observations: 'Buen rendimiento general. Requiere apoyo en matemáticas.'
  }
]

// Actividades por docente
const teacherActivities = [
  {
    id: 1,
    teacher: 'Prof. Carmen Silva',
    school: 'Escuela Rural Los Aromos',
    subject: 'Matemáticas',
    activities: [
      {
        id: 1,
        title: 'Fracciones Básicas',
        description: 'Introducción a fracciones con ejemplos prácticos',
        dueDate: '2024-01-20',
        students: 25,
        completed: 18,
        status: 'Activa'
      },
      {
        id: 2,
        title: 'Suma y Resta de Fracciones',
        description: 'Operaciones básicas con fracciones',
        dueDate: '2024-01-25',
        students: 25,
        completed: 0,
        status: 'Programada'
      }
    ]
  }
]

// Reportes por curso, escuela y región
const reportData = {
  regional: {
    totalStudents: 1247,
    avgGrade: 6.1,
    attendance: 87.5,
    completedActivities: 156,
    schools: 24
  },
  bySchool: [
    { name: 'Los Aromos', students: 45, avgGrade: 6.3, attendance: 92 },
    { name: 'Río Claro', students: 67, avgGrade: 6.0, attendance: 85 },
    { name: 'Valle Verde', students: 52, avgGrade: 6.1, attendance: 88 }
  ],
  byCourse: [
    { grade: '4° Básico', students: 234, avgGrade: 6.2, attendance: 89 },
    { grade: '5° Básico', students: 267, avgGrade: 6.1, attendance: 87 },
    { grade: '6° Básico', students: 289, avgGrade: 6.0, attendance: 86 }
  ]
}

// Estado reactivo para formularios
const selectedStudent = ref(null)
const selectedSchool = ref(null)
const selectedTeacher = ref(null)
const selectedReport = ref('')
const reportPeriod = ref('monthly')

// Funciones para manejar formularios
const handleAddSchool = () => {
  console.log('Adding school:', newSchool.value)
  // Aquí iría la lógica para agregar la escuela
  showAddSchoolForm.value = false
  // Reset form
  newSchool.value = {
    name: '',
    location: '',
    address: '',
    director: '',
    phone: '',
    email: '',
    founded: ''
  }
}

const handleAddTeacher = () => {
  console.log('Adding teacher:', newTeacher.value)
  showAddTeacherForm.value = false
  newTeacher.value = {
    name: '',
    rut: '',
    school: '',
    subjects: [],
    courses: [],
    phone: '',
    email: '',
    experience: ''
  }
}

const handleAddActivity = () => {
  console.log('Adding activity:', newActivity.value)
  showActivityForm.value = false
  newActivity.value = {
    title: '',
    subject: '',
    description: '',
    dueDate: '',
    course: ''
  }
}

const handleTakeAttendance = () => {
  console.log('Taking attendance:', attendanceForm.value)
  showAttendanceForm.value = false
}

const attendanceData = [
  { school: 'Escuela Rural Los Aromos', date: '2024-01-16', present: 42, absent: 3, percentage: 93.3 },
  { school: 'Escuela Básica Río Claro', date: '2024-01-16', present: 60, absent: 7, percentage: 89.6 },
  { school: 'Escuela Valle Verde', date: '2024-01-16', present: 48, absent: 4, percentage: 92.3 }
]

const reportTypes = [
  { id: 'academic', name: 'Académico', icon: GraduationCap, description: 'Rendimiento por estudiante, curso y escuela' },
  { id: 'attendance', name: 'Asistencia', icon: UserCheck, description: 'Reporte de asistencia por período' },
  { id: 'activities', name: 'Actividades', icon: BookOpen, description: 'Actividades completadas y pendientes' },
  { id: 'connectivity', name: 'Conectividad', icon: Wifi, description: 'Estado de conexión de las escuelas' }
]

// Datos para portal familias
const familyStudents = [
  {
    id: 1,
    name: 'María González Pérez',
    grade: '5° Básico',
    school: 'Escuela Rural Los Aromos',
    teacher: 'Prof. Carmen Silva',
    photo: '/placeholder.svg?height=80&width=80',
    lastGrades: [
      { subject: 'Matemáticas', grade: 6.2, date: '2024-01-15' },
      { subject: 'Lenguaje', grade: 5.8, date: '2024-01-14' },
      { subject: 'Ciencias', grade: 6.5, date: '2024-01-13' }
    ],
    attendance: { percentage: 90, thisWeek: 4, total: 5 },
    nextActivities: [
      { subject: 'Matemáticas', title: 'Examen Fracciones', date: '2024-01-20' },
      { subject: 'Lenguaje', title: 'Ensayo Comprensión', date: '2024-01-22' }
    ],
    messages: [
      { from: 'Prof. Carmen Silva', message: 'María ha mostrado excelente progreso en matemáticas', date: '2024-01-15' }
    ]
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
    <!-- Header mejorado con ayuda contextual -->
    <header class="backdrop-blur-xl bg-white/90 border-b border-blue-200/50 sticky top-0 z-50 shadow-sm">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center space-x-4">
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            <Menu class="w-6 h-6 text-gray-800" />
          </button>
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">EduRural</h1>
              <p class="text-xs text-gray-600">Ministerio de Educación</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notificaciones -->
          <button class="relative p-2 rounded-xl hover:bg-blue-50 transition-all duration-200">
            <Bell class="w-5 h-5 text-gray-600" />
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <!-- Ayuda contextual -->
          <button 
            @click="showHelp = !showHelp"
            class="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            <HelpCircle class="w-5 h-5 text-gray-600" />
          </button>
          
          <!-- Estado de conexión mejorado -->
          <div class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <div class="flex items-center space-x-2">
              <component 
                :is="syncStatus === 'syncing' ? RefreshCw : (isOnline ? Wifi : WifiOff)"
                class="w-4 h-4"
                :class="{
                  'text-green-500': syncStatus === 'synced' && isOnline,
                  'text-yellow-500': syncStatus === 'syncing',
                  'text-red-500': !isOnline,
                  'animate-spin': syncStatus === 'syncing'
                }"
              />
              <span class="text-sm text-gray-700 font-medium">
                {{ syncStatus === 'syncing' ? 'Sincronizando...' : (isOnline ? 'Conectado' : 'Sin conexión') }}
              </span>
            </div>
            <button 
              @click="syncData"
              class="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200"
              :disabled="syncStatus === 'syncing'"
            >
              <RefreshCw class="w-4 h-4 text-gray-600" :class="{ 'animate-spin': syncStatus === 'syncing' }" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Ayuda contextual -->
      <div v-if="showHelp" class="bg-blue-50 border-t border-blue-200 p-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="font-semibold text-blue-800 mb-2">{{ currentMenuItem?.name }}</h3>
          <p class="text-blue-700 text-sm">{{ currentMenuItem?.description }}</p>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar mejorado con posición correcta -->
      <div class="fixed top-[73px] left-0 bottom-0 z-40 w-80 backdrop-blur-xl bg-white/95 border-r border-blue-200/50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto"
           :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
        <div class="flex items-center justify-between p-6 border-b border-blue-200/50 lg:hidden">
          <span class="text-lg font-semibold text-gray-800">Navegación</span>
          <button @click="sidebarOpen = false" class="p-2 rounded-xl hover:bg-blue-50 transition-all duration-200">
            <X class="w-5 h-5 text-gray-800" />
          </button>
        </div>
        
        <nav class="mt-6 px-4 pb-6">
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.id">
              <button
                @click="setCurrentView(item.id)"
                class="w-full flex items-start px-4 py-4 text-left rounded-xl transition-all duration-200 group"
                :class="currentView === item.id 
                  ? 'bg-gradient-to-r from-blue-500/10 to-green-500/10 text-blue-700 border border-blue-200 shadow-lg shadow-blue-500/10' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'"
              >
                <component :is="item.icon" class="w-5 h-5 mr-3 mt-0.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                <div class="flex-1">
                  <span class="font-medium block">{{ item.name }}</span>
                  <span class="text-xs text-gray-500 mt-1 block">{{ item.description }}</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Overlay para móvil -->
      <div v-if="sidebarOpen" 
           @click="sidebarOpen = false"
           class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"></div>

      <!-- Main Content con margen correcto -->
      <main class="flex-1 p-6 lg:ml-80 min-h-[calc(100vh-73px)] overflow-y-auto">
        <!-- Breadcrumb con información contextual -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <span class="hover:text-gray-800 transition-colors cursor-pointer">Inicio</span>
            <ChevronRight class="w-4 h-4" />
            <span class="text-gray-800 font-medium">{{ currentMenuItem?.name }}</span>
          </div>
          <div class="text-sm text-gray-600">
            <span class="font-medium">{{ stats.offlineSchools }}</span> escuelas offline • 
            <span class="font-medium">{{ stats.pendingSync }}</span> pendientes de sincronización
          </div>
        </div>

        <!-- Dashboard Principal mejorado -->
        <div v-if="currentView === 'dashboard'" class="space-y-8">
          <!-- Alertas importantes -->
          <div v-if="stats.offlineSchools > 0" class="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <AlertCircle class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="font-bold text-orange-800">Atención: Escuelas sin conexión</h3>
                <p class="text-orange-700">{{ stats.offlineSchools }} escuelas están trabajando offline. Los datos se sincronizarán automáticamente cuando se restablezca la conexión.</p>
              </div>
            </div>
          </div>

          <!-- Stats cards principales -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 font-medium">Escuelas Activas</p>
                  <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.schools - stats.offlineSchools }}</p>
                  <p class="text-xs text-green-600 mt-1">{{ stats.offlineSchools }} offline</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <School class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 font-medium">Estudiantes</p>
                  <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.students.toLocaleString() }}</p>
                  <p class="text-xs text-green-600 mt-1">Promedio: {{ stats.avgProgress }}</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 font-medium">Asistencia Promedio</p>
                  <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.avgAttendance }}%</p>
                  <p class="text-xs text-orange-600 mt-1">Regional</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCheck class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden bg-white border border-blue-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 font-medium">Actividades</p>
                  <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.activities }}</p>
                  <p class="text-xs text-indigo-600 mt-1">{{ stats.pendingGrades }} por calificar</p>
                </div>
                <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen class="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <!-- Monitoreo en tiempo real -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Actividades en progreso -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp class="w-4 h-4 text-white" />
                  </div>
                  Progreso en Tiempo Real
                </h2>
                <p class="text-gray-600 text-sm mt-1">Actividades activas por escuela</p>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="activity in recentActivities" :key="activity.school" 
                       class="group flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                    <div class="flex items-center space-x-4">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                        <BookOpen class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="font-semibold text-gray-800">{{ activity.activity }}</p>
                        <p class="text-sm text-gray-600">{{ activity.school }} • {{ activity.teacher }}</p>
                        <div class="flex items-center gap-2 mt-1">
                          <div class="w-16 bg-gray-200 rounded-full h-1.5">
                            <div class="bg-blue-500 h-1.5 rounded-full" 
                                 :style="{ width: `${(activity.completed / activity.students) * 100}%` }"></div>
                          </div>
                          <span class="text-xs text-gray-500">{{ activity.completed }}/{{ activity.students }}</span>
                        </div>
                      </div>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full"
                          :class="activity.status === 'Completada' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'">
                      {{ activity.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estado de escuelas -->
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
              <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <MapPin class="w-4 h-4 text-white" />
                  </div>
                  Estado de Escuelas
                </h2>
                <p class="text-gray-600 text-sm mt-1">Conectividad y sincronización</p>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div v-for="school in schools" :key="school.id" 
                       class="flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-blue-100">
                    <div class="flex items-center space-x-4">
                      <div class="w-3 h-3 rounded-full"
                           :class="school.status === 'Activa' ? 'bg-green-500' : 'bg-red-500'"></div>
                      <div>
                        <p class="font-semibold text-gray-800">{{ school.name }}</p>
                        <p class="text-sm text-gray-600">{{ school.location }} • {{ school.students }} estudiantes</p>
                        <p class="text-xs text-gray-500">Última sync: {{ school.lastSync }}</p>
                      </div>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full"
                          :class="school.connectivity === 'Baja' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'">
                      {{ school.connectivity }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<!-- Escuelas y Docentes completo -->
        <div v-else-if="currentView === 'schools'" class="space-y-8 animate-slide-in-from-right">
          <!-- Resumen de escuelas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 animate-slide-in-from-top" style="animation-delay: 0.1s">
              <h3 class="font-semibold text-blue-800 mb-2">Total Escuelas</h3>
              <div class="text-3xl font-bold text-blue-700">{{ stats.schools }}</div>
              <p class="text-sm text-blue-600">{{ stats.offlineSchools }} offline</p>
            </div>
            <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 animate-slide-in-from-top" style="animation-delay: 0.2s">
              <h3 class="font-semibold text-green-800 mb-2">Total Docentes</h3>
              <div class="text-3xl font-bold text-green-700">{{ stats.teachers }}</div>
              <p class="text-sm text-green-600">Activos en el sistema</p>
            </div>
            <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 animate-slide-in-from-top" style="animation-delay: 0.3s">
              <h3 class="font-semibold text-orange-800 mb-2">Promedio Estudiantes</h3>
              <div class="text-3xl font-bold text-orange-700">{{ Math.round(stats.students / stats.schools) }}</div>
              <p class="text-sm text-orange-600">Por escuela</p>
            </div>
          </div>

          <!-- Gestión de Escuelas -->
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl animate-slide-in-from-left" style="animation-delay: 0.4s">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <School class="w-4 h-4 text-white" />
                  </div>
                  Registro de Escuelas
                </h2>
                <p class="text-gray-600 text-sm mt-1">Información completa de instituciones educativas</p>
              </div>
              <button 
                @click="showAddSchoolForm = true"
                class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Nueva Escuela
              </button>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div v-for="(school, index) in schools" :key="school.id" 
                     class="border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 animate-slide-in-from-bottom"
                     :style="`animation-delay: ${0.5 + index * 0.1}s`"
                     @click="selectedSchool = school">
                  <!-- Header de la escuela -->
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <School class="w-6 h-6 text-white" />
                      </div>
                      <div class="w-3 h-3 rounded-full"
                           :class="school.status === 'Activa' ? 'bg-green-500 animate-pulse' : 'bg-red-500'"></div>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full"
                          :class="school.connectivity === 'Baja' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'">
                      {{ school.connectivity }}
                    </span>
                  </div>

                  <!-- Información básica -->
                  <div class="mb-4">
                    <h3 class="font-bold text-gray-800 text-lg mb-1">{{ school.name }}</h3>
                    <p class="text-gray-600 text-sm mb-2">{{ school.address }}</p>
                    <p class="text-gray-500 text-xs">Fundada en {{ school.founded }}</p>
                  </div>

                  <!-- Estadísticas -->
                  <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="bg-gray-50 rounded-lg p-3 text-center">
                      <div class="font-bold text-blue-600">{{ school.students }}</div>
                      <div class="text-xs text-gray-600">Estudiantes</div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-3 text-center">
                      <div class="font-bold text-green-600">{{ school.teachers }}</div>
                      <div class="text-xs text-gray-600">Docentes</div>
                    </div>
                  </div>

                  <!-- Contacto -->
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <User class="w-4 h-4 text-gray-500" />
                      <span class="text-gray-700">{{ school.director }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Phone class="w-4 h-4 text-gray-500" />
                      <span class="text-gray-700">{{ school.phone }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Mail class="w-4 h-4 text-gray-500" />
                      <span class="text-gray-700">{{ school.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

<!-- Gestión de Docentes -->
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl animate-slide-in-from-right" style="animation-delay: 0.6s">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Users class="w-4 h-4 text-white" />
                  </div>
                  Registro de Docentes
                </h2>
                <p class="text-gray-600 text-sm mt-1">Información y asignaciones de profesores</p>
              </div>
              <button 
                @click="showAddTeacherForm = true"
                class="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Nuevo Docente
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-white/10 to-white/5">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Docente</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Escuela</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Asignaturas</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cursos</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Experiencia</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-blue-100">
                  <tr v-for="(teacher, index) in teachers" :key="teacher.id" 
                      class="hover:bg-blue-50 transition-colors duration-200 animate-slide-in-from-left"
                      :style="`animation-delay: ${0.7 + index * 0.1}s`">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <User class="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800">{{ teacher.name }}</p>
                          <p class="text-sm text-gray-600">{{ teacher.email }}</p>
                          <p class="text-xs text-gray-500">RUT: {{ teacher.rut }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600">{{ teacher.school }}</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="subject in teacher.subjects" :key="subject"
                              class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {{ subject }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span v-for="course in teacher.courses" :key="course"
                              class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          {{ course }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-600">{{ teacher.experience }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {{ teacher.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button class="text-blue-600 hover:text-blue-700 text-sm hover:scale-105 transition-all duration-200">Ver</button>
                        <button class="text-green-600 hover:text-green-700 text-sm hover:scale-105 transition-all duration-200">Editar</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        

          <!-- Modal de detalle de escuela -->
          <div v-if="selectedSchool" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               @click="selectedSchool = null">
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-bold text-gray-800">Información Completa de la Escuela</h2>
                  <button @click="selectedSchool = null" class="p-2 hover:bg-gray-100 rounded-lg">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div class="p-6 space-y-6">
                <!-- Información general -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Información General</h3>
                    <div class="space-y-2 text-sm">
                      <p><span class="font-medium">Nombre:</span> {{ selectedSchool.name }}</p>
                      <p><span class="font-medium">Ubicación:</span> {{ selectedSchool.location }}</p>
                      <p><span class="font-medium">Dirección:</span> {{ selectedSchool.address }}</p>
                      <p><span class="font-medium">Fundada:</span> {{ selectedSchool.founded }}</p>
                      <p><span class="font-medium">Estado:</span> {{ selectedSchool.status }}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Contacto</h3>
                    <div class="space-y-2 text-sm">
                      <p><span class="font-medium">Director:</span> {{ selectedSchool.director }}</p>
                      <p><span class="font-medium">Teléfono:</span> {{ selectedSchool.phone }}</p>
                      <p><span class="font-medium">Email:</span> {{ selectedSchool.email }}</p>
                      <p><span class="font-medium">Conectividad:</span> {{ selectedSchool.connectivity }}</p>
                      <p><span class="font-medium">Última Sync:</span> {{ selectedSchool.lastSync }}</p>
                    </div>
                  </div>
                </div>

                <!-- Estadísticas -->
                <div>
                  <h3 class="font-semibold text-gray-800 mb-3">Estadísticas</h3>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-blue-50 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-blue-600">{{ selectedSchool.students }}</div>
                      <div class="text-sm text-gray-600">Estudiantes</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-green-600">{{ selectedSchool.teachers }}</div>
                      <div class="text-sm text-gray-600">Docentes</div>
                    </div>
                    <div class="bg-orange-50 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-orange-600">{{ Math.round(selectedSchool.students / selectedSchool.teachers) }}</div>
                      <div class="text-sm text-gray-600">Est./Docente</div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4 text-center">
                      <div class="text-2xl font-bold text-purple-600">{{ 2024 - parseInt(selectedSchool.founded) }}</div>
                      <div class="text-sm text-gray-600">Años</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Portal Familias completo -->
        <div v-else-if="currentView === 'families'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-pink-50 to-purple-50">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-800">Portal para Familias</h2>
                  <p class="text-gray-600 text-sm">Seguimiento del progreso de sus hijos</p>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <!-- Bienvenida -->
              <div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
                <h3 class="font-bold text-gray-800 mb-2">¡Bienvenida, Familia González!</h3>
                <p class="text-gray-600">Aquí puedes ver el progreso académico de tus hijos, su asistencia y comunicarte con los profesores.</p>
              </div>

              <!-- Estudiantes de la familia -->
              <div v-for="student in familyStudents" :key="student.id" class="mb-8">
                <div class="border border-pink-200 rounded-2xl overflow-hidden">
                  <!-- Header del estudiante -->
                  <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 border-b border-pink-200">
                    <div class="flex items-center gap-4">
                      <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <User class="w-8 h-8 text-white" />
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-gray-800 text-xl">{{ student.name }}</h3>
                        <p class="text-gray-600">{{ student.grade }} • {{ student.school }}</p>
                        <p class="text-sm text-gray-500">Profesor: {{ student.teacher }}</p>
                      </div>
                      <div class="text-right">
                        <div class="text-2xl font-bold text-green-600">{{ student.attendance.percentage }}%</div>
                        <div class="text-sm text-gray-600">Asistencia</div>
                      </div>
                    </div>
                  </div>

                  <div class="p-6">
                    <!-- Resumen semanal -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div class="bg-blue-50 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-3">
                          <Award class="w-6 h-6 text-blue-500" />
                          <h4 class="font-semibold text-gray-800">Rendimiento</h4>
                        </div>
                        <div class="space-y-2">
                          <div v-for="grade in student.lastGrades.slice(0, 3)" :key="grade.subject"
                               class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">{{ grade.subject }}</span>
                            <span class="font-bold" :class="grade.grade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                              {{ grade.grade }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="bg-green-50 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-3">
                          <UserCheck class="w-6 h-6 text-green-500" />
                          <h4 class="font-semibold text-gray-800">Asistencia</h4>
                        </div>
                        <div class="text-center">
                          <div class="text-3xl font-bold text-green-600 mb-1">{{ student.attendance.thisWeek }}/{{ student.attendance.total }}</div>
                          <div class="text-sm text-gray-600">Esta semana</div>
                          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div class="bg-green-500 h-2 rounded-full" 
                                 :style="{ width: `${(student.attendance.thisWeek / student.attendance.total) * 100}%` }"></div>
                          </div>
                        </div>
                      </div>

                      <div class="bg-orange-50 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-3">
                          <Calendar class="w-6 h-6 text-orange-500" />
                          <h4 class="font-semibold text-gray-800">Próximas Actividades</h4>
                        </div>
                        <div class="space-y-2">
                          <div v-for="activity in student.nextActivities" :key="activity.title"
                               class="text-sm">
                            <div class="font-medium text-gray-800">{{ activity.title }}</div>
                            <div class="text-gray-600">{{ activity.subject }} • {{ activity.date }}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Calificaciones detalladas -->
                    <div class="mb-8">
                      <h4 class="font-semibold text-gray-800 mb-4">Últimas Calificaciones</h4>
                      <div class="overflow-x-auto">
                        <table class="w-full">
                          <thead class="bg-gray-50">
                            <tr>
                              <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Asignatura</th>
                              <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Calificación</th>
                              <th class="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Fecha</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-200">
                            <tr v-for="grade in student.lastGrades" :key="`${grade.subject}-${grade.date}`">
                              <td class="px-4 py-3 font-medium text-gray-800">{{ grade.subject }}</td>
                              <td class="px-4 py-3">
                                <span class="font-bold text-lg" :class="grade.grade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                                  {{ grade.grade }}
                                </span>
                              </td>
                              <td class="px-4 py-3 text-gray-600">{{ grade.date }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <!-- Mensajes del profesor -->
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-4">Mensajes del Profesor</h4>
                      <div class="space-y-3">
                        <div v-for="message in student.messages" :key="message.date"
                             class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <MessageSquare class="w-4 h-4 text-white" />
                            </div>
                            <div class="flex-1">
                              <div class="flex items-center justify-between mb-2">
                                <span class="font-medium text-gray-800">{{ message.from }}</span>
                                <span class="text-xs text-gray-500">{{ message.date }}</span>
                              </div>
                              <p class="text-gray-700">{{ message.message }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Botón para enviar mensaje -->
                      <button class="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                        <MessageSquare class="w-4 h-4" />
                        Enviar Mensaje al Profesor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carga de Actividades simplificada -->
        <div v-else-if="currentView === 'activities'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen class="w-4 h-4 text-white" />
                </div>
                Carga de Actividades
              </h2>
              <p class="text-gray-600 text-sm mt-1">Crear y asignar actividades de forma simple</p>
            </div>
            
            <div class="p-6">
              <!-- Formulario simplificado -->
              <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 class="font-semibold text-gray-800 mb-4">Nueva Actividad</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Título de la Actividad</label>
                    <input v-model="newActivity.title" type="text" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Ej: Fracciones Básicas">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Asignatura</label>
                    <select v-model="newActivity.subject" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Seleccionar asignatura</option>
                      <option value="mathematics">Matemáticas</option>
                      <option value="language">Lenguaje</option>
                      <option value="science">Ciencias</option>
                      <option value="history">Historia</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea v-model="newActivity.description" rows="3"
                              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Describe la actividad y objetivos..."></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Curso</label>
                    <select v-model="newActivity.course" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Seleccionar curso</option>
                      <option value="4-basico">4° Básico</option>
                      <option value="5-basico">5° Básico</option>
                      <option value="6-basico">6° Básico</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Entrega</label>
                    <input v-model="newActivity.dueDate" type="date" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  </div>
                </div>
                <div class="flex gap-3 mt-6">
                  <button class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                    <Plus class="w-4 h-4" />
                    Crear Actividad
                  </button>
                  <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    Guardar como Borrador
                  </button>
                </div>
              </div>

              <!-- Actividades existentes -->
              <div>
                <h3 class="font-semibold text-gray-800 mb-4">Mis Actividades</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="teacher in teacherActivities" :key="teacher.id">
                    <div v-for="activity in teacher.activities" :key="activity.id"
                         class="border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="font-semibold text-gray-800">{{ activity.title }}</h4>
                        <span class="text-xs px-2 py-1 rounded-full"
                              :class="activity.status === 'Activa' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'">
                          {{ activity.status }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-4">{{ activity.description }}</p>
                      <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-600">Progreso:</span>
                          <span class="font-medium">{{ activity.completed }}/{{ activity.students }}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-blue-500 h-2 rounded-full" 
                               :style="{ width: `${(activity.completed / activity.students) * 100}%` }"></div>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600">
                          <span>Vence: {{ activity.dueDate }}</span>
                          <span>{{ teacher.subject }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progreso Académico -->
        <div v-else-if="currentView === 'progress'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp class="w-4 h-4 text-white" />
                </div>
                Monitoreo de Progreso Académico
              </h2>
              <p class="text-gray-600 text-sm mt-1">Seguimiento en tiempo real del rendimiento estudiantil</p>
            </div>
            
            <div class="p-6">
              <!-- Resumen regional -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                  <h3 class="font-semibold text-blue-800 mb-2">Promedio Regional</h3>
                  <div class="text-3xl font-bold text-blue-700">{{ reportData.regional.avgGrade }}</div>
                  <p class="text-sm text-blue-600">{{ reportData.regional.totalStudents.toLocaleString() }} estudiantes</p>
                </div>
                <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                  <h3 class="font-semibold text-green-800 mb-2">Asistencia Regional</h3>
                  <div class="text-3xl font-bold text-green-700">{{ reportData.regional.attendance }}%</div>
                  <p class="text-sm text-green-600">Promedio mensual</p>
                </div>
                <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
                  <h3 class="font-semibold text-orange-800 mb-2">Actividades</h3>
                  <div class="text-3xl font-bold text-orange-700">{{ reportData.regional.completedActivities }}</div>
                  <p class="text-sm text-orange-600">Completadas este mes</p>
                </div>
              </div>

              <!-- Progreso por escuela -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-semibold text-gray-800 mb-4">Rendimiento por Escuela</h3>
                  <div class="space-y-4">
                    <div v-for="school in reportData.bySchool" :key="school.name"
                         class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p class="font-medium text-gray-800">{{ school.name }}</p>
                        <p class="text-sm text-gray-600">{{ school.students }} estudiantes</p>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-lg" :class="school.avgGrade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                          {{ school.avgGrade }}
                        </div>
                        <div class="text-sm text-gray-600">{{ school.attendance }}% asistencia</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-semibold text-gray-800 mb-4">Rendimiento por Curso</h3>
                  <div class="space-y-4">
                    <div v-for="course in reportData.byCourse" :key="course.grade"
                         class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p class="font-medium text-gray-800">{{ course.grade }}</p>
                        <p class="text-sm text-gray-600">{{ course.students }} estudiantes</p>
                      </div>
                      <div class="text-right">
                        <div class="font-bold text-lg" :class="course.avgGrade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                          {{ course.avgGrade }}
                        </div>
                        <div class="text-sm text-gray-600">{{ course.attendance }}% asistencia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<!-- Asistencia completa -->
        <div v-else-if="currentView === 'attendance'" class="space-y-8 animate-slide-in-from-right">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                        <UserCheck class="w-4 h-4 text-white" />
                  </div>
                  Control de Asistencia
                </h2>
                <p class="text-gray-600 text-sm mt-1">Registro diario y seguimiento de asistencia estudiantil</p>
              </div>
              <button 
                @click="showAttendanceForm = true"
                class="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Tomar Asistencia
              </button>
            </div>
            
            <!-- Resumen de asistencia -->
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-green-50 to-blue-50">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="text-center animate-slide-in-from-top" style="animation-delay: 0.1s">
                  <div class="text-3xl font-bold text-green-600">{{ stats.avgAttendance }}%</div>
                  <div class="text-sm text-gray-600">Asistencia Promedio</div>
                </div>
                <div class="text-center animate-slide-in-from-top" style="animation-delay: 0.2s">
                  <div class="text-3xl font-bold text-blue-600">{{ stats.students }}</div>
                  <div class="text-sm text-gray-600">Total Estudiantes</div>
                </div>
                <div class="text-center animate-slide-in-from-top" style="animation-delay: 0.3s">
                  <div class="text-3xl font-bold text-red-600">23</div>
                  <div class="text-sm text-gray-600">Ausencias Hoy</div>
                </div>
                <div class="text-center animate-slide-in-from-top" style="animation-delay: 0.4s">
                  <div class="text-3xl font-bold text-orange-600">5</div>
                  <div class="text-sm text-gray-600">Tardanzas</div>
                </div>
              </div>
            </div>

            <!-- Tabla de asistencia por escuela -->
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-white/10 to-white/5">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Escuela</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Presentes</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ausentes</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tardanzas</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Porcentaje</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-blue-100">
                  <tr v-for="(record, index) in attendanceData" :key="`${record.school}-${record.date}`" 
                      class="hover:bg-blue-50 transition-colors duration-200 animate-slide-in-from-left"
                      :style="`animation-delay: ${0.5 + index * 0.1}s`">
                    <td class="px-6 py-4 font-semibold text-gray-800">{{ record.school }}</td>
                    <td class="px-6 py-4 text-gray-600">{{ record.date }}</td>
                    <td class="px-6 py-4 text-green-600 font-bold">{{ record.present }}</td>
                    <td class="px-6 py-4 text-red-600 font-bold">{{ record.absent }}</td>
                    <td class="px-6 py-4 text-orange-600 font-bold">2</td>
                    <td class="px-6 py-4">
                      <span class="font-bold px-3 py-1 rounded-full text-sm" 
                            :class="record.percentage >= 90 ? 'bg-green-100 text-green-700' : 
                                   record.percentage >= 80 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'">
                        {{ record.percentage.toFixed(1) }}%
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium hover:scale-105 transition-all duration-200">Ver Detalle</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        

          <!-- Gráfico de tendencias -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 shadow-xl">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 class="w-5 h-5 text-blue-500" />
                Tendencia Semanal
              </h3>
              <div class="space-y-3">
                <div v-for="day in ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']" :key="day" class="flex items-center justify-between">
                  <span class="text-gray-600">{{ day }}</span>
                  <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-200 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full" :style="{ width: `${Math.random() * 20 + 80}%` }"></div>
                    </div>
                    <span class="text-sm font-medium">{{ (Math.random() * 20 + 80).toFixed(1) }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl p-6 shadow-xl">
              <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle class="w-5 h-5 text-red-500" />
                Alertas de Asistencia
              </h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p class="font-medium text-red-800">Pedro Martínez</p>
                    <p class="text-sm text-red-600">3 faltas consecutivas</p>
                  </div>
                  <button class="text-red-600 hover:text-red-700 text-sm">Contactar</button>
                </div>
                <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p class="font-medium text-yellow-800">Ana Silva</p>
                    <p class="text-sm text-yellow-600">Asistencia bajo 80%</p>
                  </div>
                  <button class="text-yellow-600 hover:text-yellow-700 text-sm">Revisar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reportes completos -->
        <div v-else-if="currentView === 'reports'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText class="w-4 h-4 text-white" />
                </div>
                Generación de Reportes
              </h2>
              <p class="text-gray-600 text-sm mt-1">Informes para docentes, familias y ministerio</p>
            </div>
            <div class="p-6">
              <!-- Tipos de reportes -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div v-for="report in reportTypes" :key="report.id" 
                     class="group border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                     :class="selectedReport === report.id ? 'border-blue-500 bg-blue-50' : ''"
                     @click="selectedReport = report.id">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <component :is="report.icon" class="w-6 h-6 text-white" />
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">{{ report.name }}</h3>
                    <p class="text-sm text-gray-600">{{ report.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Configuración del reporte -->
              <div v-if="selectedReport" class="border border-blue-200 rounded-2xl p-6 bg-blue-50 mb-8">
                <h3 class="font-bold text-gray-800 mb-4">Configurar Reporte</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Período</label>
                    <select v-model="reportPeriod" class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500">
                      <option value="weekly">Última semana</option>
                      <option value="monthly">Último mes</option>
                      <option value="quarterly">Último trimestre</option>
                      <option value="yearly">Último año</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Escuela</label>
                    <select class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500">
                      <option>Todas las escuelas</option>
                      <option v-for="school in schools" :key="school.id">{{ school.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Formato</label>
                    <select class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="word">Word</option>
                    </select>
                  </div>
                </div>
                <div class="flex gap-3">
                  <button class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                    <FileText class="w-4 h-4" />
                    Generar Reporte
                  </button>
                  <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download class="w-4 h-4" />
                    Descargar Plantilla
                  </button>
                </div>
              </div>

              <!-- Reportes recientes -->
              <div>
                <h3 class="font-bold text-gray-800 mb-4">Reportes Generados</h3>
                <div class="space-y-3">
                  <div v-for="i in 5" :key="i" class="flex items-center justify-between p-4 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors">
                    <div class="flex items-center gap-4">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <FileText class="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p class="font-medium text-gray-800">Reporte Académico - Enero 2024</p>
                        <p class="text-sm text-gray-600">Generado el 15/01/2024 • PDF • 2.3 MB</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver</button>
                      <button class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                        <Download class="w-3 h-3" />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sincronización completa -->
        <div v-else-if="currentView === 'sync'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
              <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Wifi class="w-4 h-4 text-white" />
                </div>
                Gestión de Sincronización
              </h2>
              <p class="text-gray-600 text-sm mt-1">Control de datos offline/online para zonas con conectividad limitada</p>
            </div>
            
            <!-- Estado de sincronización -->
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-green-50 to-blue-50">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="text-center p-4 bg-white rounded-xl border border-green-200">
                  <CheckCircle class="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 class="font-bold text-gray-800">Sincronizados</h3>
                  <p class="text-2xl font-bold text-green-600 mt-2">1,234</p>
                  <p class="text-sm text-gray-600">registros</p>
                </div>
                <div class="text-center p-4 bg-white rounded-xl border border-yellow-200">
                  <Clock class="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <h3 class="font-bold text-gray-800">Pendientes</h3>
                  <p class="text-2xl font-bold text-yellow-600 mt-2">{{ stats.pendingSync }}</p>
                  <p class="text-sm text-gray-600">registros</p>
                </div>
                <div class="text-center p-4 bg-white rounded-xl border border-red-200">
                  <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 class="font-bold text-gray-800">Errores</h3>
                  <p class="text-2xl font-bold text-red-600 mt-2">3</p>
                  <p class="text-sm text-gray-600">registros</p>
                </div>
                <div class="text-center p-4 bg-white rounded-xl border border-blue-200">
                  <WifiOff class="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h3 class="font-bold text-gray-800">Offline</h3>
                  <p class="text-2xl font-bold text-blue-600 mt-2">{{ stats.offlineSchools }}</p>
                  <p class="text-sm text-gray-600">escuelas</p>
                </div>
              </div>
            </div>

            <!-- Controles de sincronización -->
            <div class="p-6">
              <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-bold text-gray-800">Control de Sincronización</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full" 
                         :class="isOnline ? 'bg-green-500' : 'bg-red-500'"></div>
                    <span class="text-sm text-gray-600 font-medium">
                      {{ isOnline ? 'Conectado' : 'Sin conexión' }}
                    </span>
                  </div>
                </div>
                <div class="flex gap-3 mb-4">
                  <button 
                    @click="syncData"
                    :disabled="syncStatus === 'syncing'"
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': syncStatus === 'syncing' }" />
                    {{ syncStatus === 'syncing' ? 'Sincronizando...' : 'Sincronizar Ahora' }}
                  </button>
                  <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    Configurar Auto-sync
                  </button>
                  <button class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    Modo Offline
                  </button>
                </div>
                <div class="text-sm text-gray-600">
                  <p>Última sincronización: Hoy a las 14:30</p>
                  <p>Próxima sincronización automática: En 2 horas</p>
                </div>
              </div>

              <!-- Estado por escuela -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-bold text-gray-800 mb-4">Estado por Escuela</h3>
                  <div class="space-y-3">
                    <div v-for="school in schools" :key="school.id" 
                         class="flex items-center justify-between p-4 border border-blue-100 rounded-xl">
                      <div class="flex items-center space-x-3">
                        <div class="w-3 h-3 rounded-full"
                             :class="school.status === 'Activa' ? 'bg-green-500' : 'bg-red-500'"></div>
                        <div>
                          <p class="font-medium text-gray-800">{{ school.name }}</p>
                          <p class="text-sm text-gray-600">{{ school.lastSync }}</p>
                        </div>
                      </div>
                      <span class="text-xs px-2 py-1 rounded-full"
                            :class="school.status === 'Activa' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'">
                        {{ school.status }}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="font-bold text-gray-800 mb-4">Log de Sincronización</h3>
                  <div class="space-y-3 max-h-64 overflow-y-auto">
                    <div v-for="i in 8" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div class="flex items-center space-x-3">
                        <CheckCircle class="w-4 h-4 text-green-500" />
                        <div>
                          <p class="text-sm font-medium text-gray-800">Sincronización exitosa</p>
                          <p class="text-xs text-gray-600">{{ Math.floor(Math.random() * 200) + 50 }} registros - Hace {{ i }} horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Usuarios completo -->
        <div v-else-if="currentView === 'users'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Settings class="w-4 h-4 text-white" />
                  </div>
                  Administración de Usuarios
                </h2>
                <p class="text-gray-600 text-sm mt-1">Gestión de accesos y permisos del sistema</p>
              </div>
              <button class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                <Plus class="w-4 h-4" />
                Nuevo Usuario
              </button>
            </div>
            
            <div class="p-6">
              <!-- Tipos de usuarios -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-blue-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Settings class="w-8 h-8 text-white" />
                    </div>
                    <h3 class="font-bold text-gray-800 text-lg mb-2">Administradores</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">Acceso completo al sistema y configuraciones</p>
                    <div class="text-xs text-purple-600 font-medium">12 usuarios activos</div>
                  </div>
                </div>
                
                <div class="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-blue-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <School class="w-8 h-8 text-white" />
                    </div>
                    <h3 class="font-bold text-gray-800 text-lg mb-2">Directores</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">Gestión de su escuela y docentes</p>
                    <div class="text-xs text-blue-600 font-medium">24 directores</div>
                  </div>
                </div>
                
                <div class="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-blue-100 rounded-2xl p-8 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users class="w-8 h-8 text-white" />
                    </div>
                    <h3 class="font-bold text-gray-800 text-lg mb-2">Docentes</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">Acceso a sus cursos y estudiantes</p>
                    <div class="text-xs text-green-600 font-medium">156 docentes</div>
                  </div>
                </div>
              </div>

              <!-- Lista de usuarios -->
              <div>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="font-bold text-gray-800">Usuarios del Sistema</h3>
                  <div class="flex gap-3">
                    <button class="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                      <Search class="w-4 h-4" />
                      Buscar
                    </button>
                    <button class="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                      <Filter class="w-4 h-4" />
                      Filtrar
                    </button>
                  </div>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gradient-to-r from-white/10 to-white/5">
                      <tr>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Usuario</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Escuela</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Último Acceso</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                        <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-blue-100">
                      <tr v-for="i in 10" :key="i" class="hover:bg-blue-50 transition-colors duration-200">
                        <td class="px-6 py-4">
                          <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <User class="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p class="font-semibold text-gray-800">Usuario {{ i }}</p>
                              <p class="text-sm text-gray-600">usuario{{ i }}@edurural.cl</p>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-2 py-1 text-xs rounded-full"
                                :class="i <= 3 ? 'bg-purple-100 text-purple-700' : 
                                       i <= 8 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'">
                            {{ i <= 3 ? 'Administrador' : i <= 8 ? 'Director' : 'Docente' }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-gray-600">
                          {{ i <= 3 ? 'Regional' : schools[Math.floor(Math.random() * schools.length)].name }}
                        </td>
                        <td class="px-6 py-4 text-gray-600">Hace {{ Math.floor(Math.random() * 24) + 1 }} horas</td>
                        <td class="px-6 py-4">
                          <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Activo
                          </span>
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex gap-2">
                            <button class="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                            <button class="text-red-600 hover:text-red-700 text-sm">Desactivar</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resto de las vistas existentes (students, activities, etc.) -->
        <!-- Fichas de Estudiantes -->
        <div v-else-if="currentView === 'students'" class="space-y-8">
          <div class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent flex justify-between items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap class="w-4 h-4 text-white" />
                  </div>
                  Fichas de Estudiantes
                </h2>
                <p class="text-gray-600 text-sm mt-1">Datos personales, rendimiento y asistencia</p>
              </div>
              <div class="flex gap-3">
                <button class="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                  <Search class="w-4 h-4" />
                  Buscar
                </button>
                <button class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
                  <Plus class="w-4 h-4" />
                  Nuevo Estudiante
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div v-for="student in studentProfiles" :key="student.id" 
                     class="border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                     @click="selectedStudent = student">
                  <!-- Información básica -->
                  <div class="flex items-start gap-4 mb-6">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <User class="w-8 h-8 text-white" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-800 text-lg">{{ student.name }}</h3>
                      <p class="text-gray-600">{{ student.grade }} • {{ student.school }}</p>
                      <p class="text-sm text-gray-500">RUT: {{ student.rut }}</p>
                    </div>
                  </div>

                  <!-- Progreso académico -->
                  <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Rendimiento Académico</h4>
                    <div class="grid grid-cols-2 gap-3">
                      <div v-for="(subject, key) in student.academicProgress" :key="key" 
                           class="bg-gray-50 rounded-lg p-3">
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-600 capitalize">{{ key === 'mathematics' ? 'Matemáticas' : key === 'language' ? 'Lenguaje' : key === 'science' ? 'Ciencias' : 'Historia' }}</span>
                          <div class="flex items-center gap-1">
                            <span class="font-bold" :class="subject.grade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                              {{ subject.grade }}
                            </span>
                            <TrendingUp v-if="subject.trend === 'up'" class="w-3 h-3 text-green-500" />
                            <div v-else-if="subject.trend === 'stable'" class="w-3 h-3 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Asistencia -->
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-sm text-gray-600">Asistencia</span>
                      <div class="font-bold text-lg" :class="student.attendance.percentage >= 85 ? 'text-green-600' : 'text-red-600'">
                        {{ student.attendance.percentage }}%
                      </div>
                    </div>
                    <div class="w-16 bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" 
                           :style="{ width: `${student.attendance.percentage}%` }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal de detalle de estudiante -->
          <div v-if="selectedStudent" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               @click="selectedStudent = null">
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h2 class="text-2xl font-bold text-gray-800">Ficha Completa del Estudiante</h2>
                  <button @click="selectedStudent = null" class="p-2 hover:bg-gray-100 rounded-lg">
                    <X class="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div class="p-6 space-y-6">
                <!-- Datos personales -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Datos Personales</h3>
                    <div class="space-y-2 text-sm">
                      <p><span class="font-medium">Nombre:</span> {{ selectedStudent.name }}</p>
                      <p><span class="font-medium">RUT:</span> {{ selectedStudent.rut }}</p>
                      <p><span class="font-medium">Fecha de Nacimiento:</span> {{ selectedStudent.birthDate }}</p>
                      <p><span class="font-medium">Dirección:</span> {{ selectedStudent.address }}</p>
                      <p><span class="font-medium">Apoderado:</span> {{ selectedStudent.guardian }}</p>
                      <p><span class="font-medium">Teléfono:</span> {{ selectedStudent.phone }}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-3">Información Académica</h3>
                    <div class="space-y-2 text-sm">
                      <p><span class="font-medium">Curso:</span> {{ selectedStudent.grade }}</p>
                      <p><span class="font-medium">Escuela:</span> {{ selectedStudent.school }}</p>
                      <p><span class="font-medium">Asistencia:</span> {{ selectedStudent.attendance.percentage }}%</p>
                    </div>
                  </div>
                </div>

                <!-- Observaciones -->
                <div>
                  <h3 class="font-semibold text-gray-800 mb-3">Observaciones</h3>
                  <p class="text-gray-600 bg-gray-50 p-4 rounded-lg">{{ selectedStudent.observations }}</p>
                </div>

                <!-- Actividades recientes -->
                <div>
                  <h3 class="font-semibold text-gray-800 mb-3">Actividades Recientes</h3>
                  <div class="space-y-2">
                    <div v-for="activity in selectedStudent.recentActivities" :key="activity.title"
                         class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p class="font-medium">{{ activity.subject }} - {{ activity.title }}</p>
                        <p class="text-sm text-gray-600">{{ activity.status }}</p>
                      </div>
                      <span v-if="activity.grade" class="font-bold" 
                            :class="activity.grade >= 6.0 ? 'text-green-600' : 'text-red-600'">
                        {{ activity.grade }}
                      </span>
                      <span v-else class="text-gray-500 text-sm">Pendiente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resto de vistas existentes (activities, attendance, progress, reports, sync, users) -->
        <!-- [Aquí van todas las demás vistas que ya estaban implementadas] -->

        <!-- Vista por defecto para secciones no implementadas -->
        <div v-else class="backdrop-blur-xl bg-white/90 border border-blue-100 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-6 border-b border-blue-200/50 bg-gradient-to-r from-white/10 to-transparent">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <component :is="currentMenuItem?.icon" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-gray-800">{{ currentMenuItem?.name }}</h2>
                <p class="text-gray-600 text-sm">{{ currentMenuItem?.description }}</p>
              </div>
            </div>
          </div>
          <div class="p-8">
            <div class="text-center py-16">
              <div class="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <component :is="currentMenuItem?.icon" class="w-12 h-12 text-gray-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ currentMenuItem?.name }}</h3>
              <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
                Esta sección implementará {{ currentMenuItem?.description.toLowerCase() }} con herramientas simples y económicas para docentes con formación básica en TIC.
              </p>
              <button class="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
                Próximamente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  <!-- Modales de formularios -->
    <!-- Modal Agregar Escuela -->
    <div v-if="showAddSchoolForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
         @click="showAddSchoolForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">Agregar Nueva Escuela</h2>
        </div>
        
        <form @submit.prevent="handleAddSchool" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de la Escuela</label>
              <input v-model="newSchool.name" type="text" placeholder="Ej: Escuela Rural Los Aromos" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <input v-model="newSchool.location" type="text" placeholder="Ej: Temuco" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
              <input v-model="newSchool.address" type="text" placeholder="Ej: Camino Rural Km 15, Temuco" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Director</label>
              <input v-model="newSchool.director" type="text" placeholder="Ej: María González" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Año de Fundación</label>
              <input v-model="newSchool.founded" type="number" placeholder="Ej: 1985" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input v-model="newSchool.phone" type="tel" placeholder="Ej: +56 9 8765 4321" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="newSchool.email" type="email" placeholder="Ej: direccion@escuela.cl" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Agregar Escuela
            </button>
            <button type="button" @click="showAddSchoolForm = false" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Agregar Docente -->
    <div v-if="showAddTeacherForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
         @click="showAddTeacherForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">Agregar Nuevo Docente</h2>
        </div>
        
        <form @submit.prevent="handleAddTeacher" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input v-model="newTeacher.name" type="text" placeholder="Ej: Carmen Silva Rodríguez" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">RUT</label>
              <input v-model="newTeacher.rut" type="text" placeholder="Ej: 12.345.678-9" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Escuela</label>
              <select v-model="newTeacher.school" required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Seleccionar escuela</option>
                <option v-for="school in schools" :key="school.id" :value="school.name">{{ school.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Años de Experiencia</label>
              <input v-model="newTeacher.experience" type="text" placeholder="Ej: 15 años" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input v-model="newTeacher.phone" type="tel" placeholder="Ej: +56 9 8765 4321" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="newTeacher.email" type="email" placeholder="Ej: carmen.silva@escuela.cl" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Agregar Docente
            </button>
            <button type="button" @click="showAddTeacherForm = false" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Crear Actividad -->
    <div v-if="showActivityForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
         @click="showActivityForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">Nueva Actividad</h2>
        </div>
        
        <form @submit.prevent="handleAddActivity" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Título de la Actividad</label>
              <input v-model="newActivity.title" type="text" placeholder="Ej: Fracciones Básicas" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Asignatura</label>
              <select v-model="newActivity.subject" required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Seleccionar asignatura</option>
                <option value="mathematics">Matemáticas</option>
                <option value="language">Lenguaje</option>
                <option value="science">Ciencias</option>
                <option value="history">Historia</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea v-model="newActivity.description" placeholder="Describe la actividad y objetivos..." rows="3"
                        class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Curso</label>
              <select v-model="newActivity.course" required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Seleccionar curso</option>
                <option value="4-basico">4° Básico</option>
                <option value="5-basico">5° Básico</option>
                <option value="6-basico">6° Básico</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Entrega</label>
              <input v-model="newActivity.dueDate" type="date" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
          <div class="flex gap-3 pt-4">
            <button type="submit" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Crear Actividad
            </button>
            <button type="button" @click="showActivityForm = false" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Tomar Asistencia -->
    <div v-if="showAttendanceForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
         @click="showAttendanceForm = false">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" @click.stop>
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">Tomar Asistencia</h2>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Escuela</label>
              <select v-model="attendanceForm.school" required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Seleccionar escuela</option>
                <option v-for="school in schools" :key="school.id" :value="school.name">{{ school.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Curso</label>
              <select v-model="attendanceForm.course" required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Seleccionar curso</option>
                <option value="4-basico">4° Básico</option>
                <option value="5-basico">5° Básico</option>
                <option value="6-basico">6° Básico</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input v-model="attendanceForm.date" type="date" required
                     class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
            </div>
          </div>

          <div class="border rounded-lg p-4 max-h-96 overflow-y-auto">
            <h4 class="font-semibold mb-4">Lista de Estudiantes</h4>
            <div class="space-y-2">
              <div v-for="(student, index) in ['María González', 'Pedro Martínez', 'Ana Silva', 'Carlos López', 'Sofía Morales']" :key="index"
                   class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="font-medium">{{ student }}</span>
                <div class="flex gap-2">
                  <button type="button" class="px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors">
                    Presente
                  </button>
                  <button type="button" class="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors">
                    Ausente
                  </button>
                  <button type="button" class="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg transition-colors">
                    Tardanza
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button @click="handleTakeAttendance" class="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Guardar Asistencia
            </button>
            <button @click="showAttendanceForm = false" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
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

@keyframes slide-in-from-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
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

.animate-slide-in-from-left {
  animation: slide-in-from-left 0.5s ease-out;
}

.animate-slide-in-from-right {
  animation: slide-in-from-right 0.5s ease-out;
}

.animate-zoom-in {
  animation: zoom-in 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

/* Efectos hover */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:-translate-y-0\.5:hover {
  transform: translateY(-0.125rem);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-0.5rem);
}

/* Transiciones suaves */
button,
.card,
.hover-effect {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
