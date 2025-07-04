# Sistema de Administración - Restaurante Argentum

## Descripción

Este sistema de administración permite gestionar completamente el restaurante Argentum, incluyendo la gestión de platos, usuarios y configuraciones del sistema.

## Características

### 🔐 Autenticación
- **Login de administradores**: Sistema seguro de autenticación
- **Registro de administradores**: Creación de nuevas cuentas de administración
- **Protección de rutas**: Acceso restringido solo a usuarios autenticados
- **Gestión de tokens**: Sistema de tokens JWT para sesiones seguras

### 🍽️ Gestión de Platos
- **Agregar platos**: Crear nuevos platos con toda la información necesaria
- **Editar platos**: Modificar información existente de platos
- **Eliminar platos**: Remover platos del menú
- **Filtros y búsqueda**: Buscar y filtrar platos por categoría y nombre
- **Gestión de alérgenos**: Especificar alérgenos para cada plato
- **Categorización**: Organizar platos por categorías

### 👥 Gestión de Usuarios
- **Crear usuarios**: Agregar nuevos usuarios al sistema
- **Editar usuarios**: Modificar información de usuarios existentes
- **Eliminar usuarios**: Remover usuarios del sistema
- **Gestión de roles**: Asignar roles (admin, owner, user)
- **Cambio de contraseñas**: Actualizar contraseñas de usuarios

### 📊 Dashboard
- **Estadísticas**: Vista general de platos, usuarios y categorías
- **Actividad reciente**: Seguimiento de acciones recientes
- **Acciones rápidas**: Acceso directo a funciones principales
- **Información del sistema**: Estado y versión del sistema

## Estructura de Archivos

```
src/
├── services/
│   ├── auth.js          # Servicios de autenticación
│   └── admin.js         # Servicios del dashboard
├── components/
│   ├── pages/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── admin/
│   │       ├── DishesManagement.jsx
│   │       └── UsersManagement.jsx
│   │       └── LogsManagment.jsx
│   │       └── CategoriesManagment.jsx
│   ├── admin/
│   │   ├── AdminLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProtectedRoute.jsx
│   └── ui/
│       ├── input.jsx
│       ├── label.jsx
│       ├── textarea.jsx
│       └── select.jsx
```

## Rutas del Sistema

### Autenticación
- `/admin/login` - Página de login

### Dashboard (Protegidas)
- `/admin/dashboard` - Dashboard principal
- `/admin/dashboard/dishes` - Gestión de platos
- `/admin/dashboard/users` - Gestión de usuarios
- `/admin/dashboard/categories` - Gestión de Categorias
- `/admin/dashboard/logs` - Gestión de Auditoria


## Servicios API

### Autenticación (`auth.js`)
- `loginAdmin(email, password)` - Login de administrador
- `logout()` - Cerrar sesión

### Administración (`admin.js`)
- `getAllDishes()` - Obtener todos los platos
- `createDish(dishData)` - Crear nuevo plato
- `updateDish(id, dishData)` - Actualizar plato
- `deleteDish(id)` - Eliminar plato
- `getAllUsers()` - Obtener todos los usuarios
- `createUser(userData)` - Crear nuevo usuario
- `updateUser(id, userData)` - Actualizar usuario
- `deleteUser(id)` - Eliminar usuario
- `changeUserRole(id, role)` - Cambiar rol de usuario

## Configuración

### Variables de Entorno (Vite)
Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001/api
```

**Nota**: En Vite, las variables de entorno deben comenzar con `VITE_` para ser accesibles en el código del cliente.

### Roles de Usuario
- **admin**: Administrador con acceso completo
- **owner**: Propietario con permisos especiales
- **user**: Usuario básico

## Uso

### 1. Acceso al Sistema
1. Navegar a `/admin/login`
2. Ingresar credenciales de administrador
3. Ser redirigido al dashboard

### 2. Gestión de Platos
1. Ir a "Platos" en el sidebar
2. Usar "Agregar Plato" para crear nuevos
3. Usar iconos de edición/eliminación para gestionar existentes
4. Usar filtros para buscar platos específicos

### 3. Gestión de Usuarios
1. Ir a "Usuarios" en el sidebar
2. Usar "Agregar Usuario" para crear nuevos
3. Editar información existente
4. Cambiar roles directamente desde la lista

### 4. Gestión de Categorias
1. Ir a "Categorias" en el sidebar
2. Usar "Agregar Categoria" para crear nuevas.
3. Editar información existente

### 5. Navegación
- **Sidebar**: Navegación principal entre secciones
- **Breadcrumbs**: Indicador de ubicación actual
- **Acciones rápidas**: Acceso directo desde el dashboard

## Seguridad

- **Autenticación requerida**: Todas las rutas del dashboard están protegidas
- **Verificación de tokens**: Validación automática de sesiones
- **Redirección automática**: Usuarios no autenticados son redirigidos al login
- **Logout seguro**: Limpieza completa de datos de sesión

## Estilos

El sistema utiliza:
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Variables CSS personalizadas** para temas
- **Componentes reutilizables** para consistencia

## Próximas Funcionalidades

- [ ] Subida de imágenes
- [ ] Notificaciones en tiempo real
- [ ] Exportación de datos
- [ ] Configuraciones del restaurante
- [ ] Gestión de reservas
- [ ] Estadísticas avanzadas y Reportes
