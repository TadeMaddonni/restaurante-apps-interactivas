# 🚀 Frontend - Sistema de Gestión de Usuarios con Roles

## 📋 Resumen de Implementación

### 🔐 Roles Implementados

- **Owner (rolId: 1)**: Acceso completo al sistema
- **Admin (rolId: 2)**: Acceso limitado según restricciones
- **User (rolId: 3)**: Sin acceso al panel de administración

### 🛡️ Restricciones de Permisos

#### **Owners pueden:**

- ✅ Crear otros owners, admins y users
- ✅ Eliminar cualquier tipo de usuario (owners, admins, users)
- ✅ Acceso completo a todas las funcionalidades del panel
- ✅ Ver todas las estadísticas del dashboard

#### **Admins pueden:**

- ✅ Crear solo users (rolId: 3)
- ❌ **NO** pueden crear otros admins
- ❌ **NO** pueden crear owners
- ✅ Eliminar solo users (rolId: 3)
- ❌ **NO** pueden eliminar owners
- ❌ **NO** pueden eliminar otros admins
- ✅ Acceso a gestión de platos y categorías
- ✅ Ver estadísticas (excepto usuarios si no tienen permisos)

#### **Users:**

- ❌ **NO** tienen acceso al panel de administración
- ❌ La opción "Usuarios" no aparece en el sidebar

## 🔧 Archivos Modificados

### **1. Sistema de Autenticación** (`src/lib/auth.js`)

```javascript
// Constantes de roles
export const ROLES = {
  OWNER: 1,
  ADMIN: 2,
  USER: 3,
};

// Funciones de verificación
-isOwner() -
  isAdmin() -
  isOwnerOrAdmin() -
  canCreateAdmins() -
  canDeleteUser(targetUserRoleId) -
  canAccessUserManagement();
```

### **2. Servicios Actualizados**

#### **`src/services/admin.js`**

- ✅ `createUser()`: Usa 'contraseña' en lugar de 'password'
- ✅ `updateUser()`: Validaciones mejoradas
- ✅ Manejo de rolId según especificaciones del backend

#### **`src/services/auth.js`**

- ✅ `registerUser()`: Para registro público (sin autenticación)
- ✅ `loginAdmin()`: Login con 'contraseña'
- ✅ `getAllUsers()`: Con autenticación requerida

### **3. Componentes Actualizados**

#### **`src/components/admin/Sidebar.jsx`**

- ✅ Opción "Usuarios" solo visible para owners y admins
- ✅ Verificación con `canAccessUserManagement()`

#### **`src/components/pages/admin/UsersManagement.jsx`**

- ✅ Validaciones frontend según especificaciones del backend
- ✅ Permisos para crear admins (solo owners)
- ✅ Permisos para eliminar usuarios según roles
- ✅ Formulario con roles disponibles filtrados por permisos
- ✅ Manejo de errores específicos del backend

#### **`src/components/pages/AdminDashboard.jsx`**

- ✅ Indicador visual del rol actual del usuario
- ✅ Estadística de usuarios solo visible con permisos
- ✅ Colores distintivos para cada rol

#### **`src/components/admin/RoleProtectedRoute.jsx`** (Nuevo)

- ✅ Protección de rutas por rol
- ✅ Redirección automática si no hay permisos

## 📋 Validaciones Frontend

### **Campos de Usuario**

| Campo          | Validación                                      | Mensaje de Error                                                  |
| -------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| **nombre**     | Requerido, 1-100 caracteres                     | "El nombre es requerido" / "No puede tener más de 100 caracteres" |
| **email**      | Requerido, formato válido                       | "El email es requerido" / "Ingresa un email válido"               |
| **contraseña** | Mínimo 6 caracteres (solo para nuevos usuarios) | "La contraseña debe tener al menos 6 caracteres"                  |
| **rolId**      | Según permisos del usuario actual               | "Solo los propietarios pueden crear administradores"              |

## 🌐 Integración con Backend

### **Estructura de Datos - Crear Usuario**

```javascript
// Para usuarios normales (registro público)
{
    "nombre": "string",
    "email": "string",
    "contraseña": "string"
    // rolId se omite (será 3 por defecto)
}

// Para crear administradores (solo owners)
{
    "nombre": "string",
    "email": "string",
    "contraseña": "string",
    "rolId": 2
}
```

### **Headers Requeridos**

```javascript
// Para usuarios normales
{
    "Content-Type": "application/json"
}

// Para crear administradores
{
    "Content-Type": "application/json",
    "Authorization": "Bearer <token_de_owner>"
}
```

### **Respuestas Manejadas**

- ✅ 201: Usuario creado exitosamente
- ✅ 400: Error de validación (email, contraseña, etc.)
- ✅ 403: Sin permisos para crear admin
- ✅ 409: Email duplicado

## 🚀 Funcionalidades Implementadas

### **Dashboard**

- ✅ Muestra rol actual del usuario con colores distintivos
- ✅ Estadísticas condicionadas por permisos
- ✅ Indicador de última actualización

### **Gestión de Usuarios**

- ✅ Lista de usuarios con información de rol
- ✅ Botones de acción condicionados por permisos
- ✅ Formulario de creación/edición con validaciones
- ✅ Selector de roles filtrado por permisos del usuario actual
- ✅ Confirmaciones y mensajes de error específicos

### **Navegación**

- ✅ Sidebar con opciones condicionadas por rol
- ✅ Protección de rutas por permisos
- ✅ Redirección automática para usuarios sin permisos

### **Seguridad**

- ✅ Verificaciones de permisos en frontend y backend
- ✅ Tokens JWT con información de rol
- ✅ Validaciones de entrada según especificaciones
- ✅ Manejo seguro de contraseñas

## 🎯 Testing Sugerido

### **Como Owner:**

1. ✅ Crear usuarios de todos los roles
2. ✅ Eliminar usuarios de todos los roles
3. ✅ Ver todas las estadísticas del dashboard

### **Como Admin:**

1. ✅ Crear solo users (verificar que no puede crear admins)
2. ✅ Eliminar solo users (verificar que no puede eliminar admins/owners)
3. ✅ Verificar que ve la gestión de usuarios pero con restricciones

### **Como User:**

1. ✅ Verificar que no tiene acceso al panel de administración
2. ✅ Verificar redirección automática si intenta acceder

## 🔮 Próximas Mejoras Sugeridas

- [ ] Sistema de notificaciones para acciones exitosas/fallidas
- [ ] Confirmaciones modales en lugar de alerts básicos
- [ ] Logging de actividades de usuarios
- [ ] Paginación en la lista de usuarios
- [ ] Filtros avanzados por rol y estado
- [ ] Búsqueda en tiempo real
- [ ] Exportación de datos de usuarios
