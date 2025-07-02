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