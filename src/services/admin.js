// Servicios para el dashboard deistración
import { getAuthToken } from "../lib/auth";

// Base URL de la API (configurar según el entorno)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Función helper para hacer requests autenticados
const authenticatedRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('No hay token de autenticación');
    }

    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
    }

    return data;
};

// ===== SERVICIOS PARA PLATOS =====

// Obtener todos los platos
export const getAllDishes = async () => {
    try {
        const data = await authenticatedRequest('/dishes');
        return { success: true, dishes: data.dishes };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Obtener un plato por ID
export const getDishById = async (id) => {
    try {
        const data = await authenticatedRequest(`/dishes/${id}`);
        return { success: true, dish: data.dish };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Crear un nuevo plato
export const createDish = async (dishData) => {
    try {
        const data = await authenticatedRequest('/platos', {
            method: 'POST',
            body: JSON.stringify(dishData),
        });
        return { success: true, dish: data.dish, message: 'Plato creado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Actualizar un plato
export const updateDish = async (id, dishData) => {
    try {
        const data = await authenticatedRequest(`/platos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dishData),
        });
        return { success: true, dish: data.dish, message: 'Plato actualizado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Eliminar un platog
export const deleteDish = async (id) => {
    try {
        await authenticatedRequest(`/platos/${id}`, {
            method: 'DELETE',   
        });
        return { success: true, message: 'Plato eliminado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Subir imagen de un plato
export const uploadDishImage = async (dishId, imageFile) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(`${API_BASE_URL}/platos/${dishId}/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al subir imagen');
        }

        return { success: true, imageUrl: data.imageUrl, message: 'Imagen subida exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ===== SERVICIOS PARA USUARIOS =====

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const data = await authenticatedRequest('/users');
        return { success: true, users: data.users };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
    try {
        const data = await authenticatedRequest(`/users/${id}`);
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        const data = await authenticatedRequest('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return { success: true, user: data.user, message: 'Usuario creado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
    try {
        const data = await authenticatedRequest(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
        return { success: true, user: data.user, message: 'Usuario actualizado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
    try {
        await authenticatedRequest(`/users/${id}`, {
            method: 'DELETE',
        });
        return { success: true, message: 'Usuario eliminado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Cambiar rol de usuario
export const changeUserRole = async (id, role) => {
    try {
        const data = await authenticatedRequest(`/users/${id}/role`, {
            method: 'PATCH',
            body: JSON.stringify({ role }),
        });
        return { success: true, user: data.user, message: 'Rol actualizado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ===== SERVICIOS PARA CATEGORÍAS =====

// Obtener todas las categorías
export const getAllCategories = async () => {
    try {
        const data = await authenticatedRequest('/categories');
        return { success: true, categories: data.categories };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
    try {
        const data = await authenticatedRequest('/categories', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
        return { success: true, category: data.category, message: 'Categoría creada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Actualizar una categoría
export const updateCategory = async (id, categoryData) => {
    try {
        const data = await authenticatedRequest(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData),
        });
        return { success: true, category: data.category, message: 'Categoría actualizada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
    try {
        await authenticatedRequest(`/categories/${id}`, {
            method: 'DELETE',
        });
        return { success: true, message: 'Categoría eliminada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ===== SERVICIOS PARA ESTADÍSTICAS =====

// Obtener estadísticas del dashboard
export const getDashboardStats = async () => {
    try {
        const data = await authenticatedRequest('/stats');
        return { success: true, stats: data.stats };
    } catch (error) {
        return { success: false, error: error.message };
    }
}; 