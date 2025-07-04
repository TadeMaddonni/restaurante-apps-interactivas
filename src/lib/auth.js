// Función para obtener el token almacenado
export const getAuthToken = () => {
    return localStorage.getItem('adminToken');
};

// Función para guardar el token
export const setAuthToken = (token) => {
    localStorage.setItem('adminToken', token);
};

// Función para eliminar el token
export const removeAuthToken = () => {
    localStorage.removeItem('adminToken');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
};

// Función para obtener información del usuario actual
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
};

// Función para guardar información del usuario
export const setCurrentUser = (user) => {
    localStorage.setItem('adminUser', JSON.stringify(user));
};

// Función para eliminar información del usuario
export const removeCurrentUser = () => {
    localStorage.removeItem('adminUser');
};

// Función para hacer logout
export const logout = () => {
    removeAuthToken();
    removeCurrentUser();
};

// Constantes de roles
export const ROLES = {
    OWNER: 1,
    ADMIN: 2,
    USER: 3
};

// Función para obtener el rol del usuario actual
export const getCurrentUserRole = () => {
    const user = getCurrentUser();
    return user?.rolId || null;
};

// Función para verificar si el usuario es owner
export const isOwner = () => {
    return getCurrentUserRole() === ROLES.OWNER;
};

// Función para verificar si el usuario es admin
export const isAdmin = () => {
    return getCurrentUserRole() === ROLES.ADMIN;
};

// Función para verificar si el usuario es owner o admin
export const isOwnerOrAdmin = () => {
    const role = getCurrentUserRole();
    return role === ROLES.OWNER || role === ROLES.ADMIN;
};

// Función para verificar si el usuario puede crear admins
export const canCreateAdmins = () => {
    return isOwner();
};

// Función para verificar si el usuario puede eliminar a otro usuario
export const canDeleteUser = (targetUserRoleId) => {
    const currentUserRole = getCurrentUserRole();
    
    // Owners pueden eliminar cualquier usuario
    if (currentUserRole === ROLES.OWNER) {
        return true;
    }
    
    // Admins solo pueden eliminar users (rolId === 3)
    if (currentUserRole === ROLES.ADMIN) {
        return targetUserRoleId === ROLES.USER;
    }
    
    // Users no pueden eliminar a nadie
    return false;
};

// Función para verificar si el usuario puede acceder a la gestión de usuarios
export const canAccessUserManagement = () => {
    return isOwnerOrAdmin();
};

// Función para verificar si el usuario puede editar a otro usuario
export const canEditUser = (targetUserId, targetUserRoleId) => {
    const currentUser = getCurrentUser();
    const currentUserRole = getCurrentUserRole();
    
    if (!currentUser) return false;
    
    // Los users solo pueden editar su propio perfil
    if (currentUserRole === ROLES.USER) {
        return currentUser.id === targetUserId;
    }
    
    // Los owners pueden editar cualquier usuario
    if (currentUserRole === ROLES.OWNER) {
        return true;
    }
    
    // Los admins pueden editar solo usuarios normales (rolId === 3)
    if (currentUserRole === ROLES.ADMIN) {
        return targetUserRoleId === ROLES.USER;
    }
    
    return false;
};

// Función para verificar si el usuario puede cambiar roles
export const canChangeRole = (targetUserRoleId) => {
    const currentUserRole = getCurrentUserRole();
    
    // Solo owners pueden cambiar roles
    return currentUserRole === ROLES.OWNER;
};

// Función para verificar si el usuario puede actualizar un campo específico
export const canUpdateField = (fieldName, targetUserId, targetUserRoleId) => {
    const currentUser = getCurrentUser();
    const currentUserRole = getCurrentUserRole();
    
    if (!currentUser) return false;
    
    // Verificar permisos básicos de edición
    if (!canEditUser(targetUserId, targetUserRoleId)) {
        return false;
    }
    
    // Verificar permisos específicos para cambio de rol
    if (fieldName === 'rolId') {
        return canChangeRole(targetUserRoleId);
    }
    
    // Para otros campos (nombre, email, contraseña), usar permisos básicos de edición
    return true;
};