// Base URL de la API (configurar según el entorno)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ===== SERVICIOS PÚBLICOS PARA CATEGORÍAS =====

// Obtener todas las categorías (público)
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias`);
        
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }

        const data = await response.json();
        return { success: true, categories: data.categories || data };
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return { success: false, error: error.message };
    }
};

// Obtener una categoría por ID (público)
export const getCategoryById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener la categoría');
        }

        const data = await response.json();
        return { success: true, category: data.category || data };
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        return { success: false, error: error.message };
    }
};

// Obtener categorías activas (público)
export const getActiveCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/active`);
        
        if (!response.ok) {
            throw new Error('Error al obtener las categorías activas');
        }

        const data = await response.json();
        return { success: true, categories: data.categories || data };
    } catch (error) {
        console.error('Error al obtener las categorías activas:', error);
        return { success: false, error: error.message };
    }
};

// Obtener platos por categoría (público)
export const getDishesByCategory = async (categoryId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/${categoryId}/dishes`);
        
        if (!response.ok) {
            throw new Error('Error al obtener los platos de la categoría');
        }

        const data = await response.json();
        return { success: true, dishes: data.dishes || data };
    } catch (error) {
        console.error('Error al obtener los platos de la categoría:', error);
        return { success: false, error: error.message };
    }
};

// ===== SERVICIOS ADMIN PARA CATEGORÍAS =====

// Función helper para hacer requests autenticados
const authenticatedRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('adminToken');
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

// Obtener todas las categorías (admin)
export const getAllCategoriesAdmin = async () => {
    try {
        const data = await authenticatedRequest('/admin/categorias');
        return { success: true, categories: data.categories };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Obtener una categoría por ID (admin)
export const getCategoryByIdAdmin = async (id) => {
    try {
        const data = await authenticatedRequest(`/admin/categorias/${id}`);
        return { success: true, category: data.category };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Crear una nueva categoría (admin)
export const createCategory = async (categoryData) => {
    try {
        const data = await authenticatedRequest('/admin/categorias', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
        return { success: true, category: data.category, message: 'Categoría creada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Actualizar una categoría (admin)
export const updateCategory = async (id, categoryData) => {
    try {
        const data = await authenticatedRequest(`/admin/categorias/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData),
        });
        return { success: true, category: data.category, message: 'Categoría actualizada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Eliminar una categoría (admin)
export const deleteCategory = async (id) => {
    try {
        await authenticatedRequest(`/admin/categorias/${id}`, {
            method: 'DELETE',
        });
        return { success: true, message: 'Categoría eliminada exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Activar/desactivar una categoría (admin)
export const toggleCategoryStatus = async (id, isActive) => {
    try {
        const data = await authenticatedRequest(`/admin/categorias/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ isActive }),
        });
        return { 
            success: true, 
            category: data.category, 
            message: isActive ? 'Categoría activada exitosamente' : 'Categoría desactivada exitosamente' 
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Reordenar categorías (admin)
export const reorderCategories = async (categoryIds) => {
    try {
        const data = await authenticatedRequest('/admin/categorias/reorder', {
            method: 'PUT',
            body: JSON.stringify({ categoryIds }),
        });
        return { success: true, categories: data.categories, message: 'Orden de categorías actualizado exitosamente' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ===== FUNCIONES UTILITARIAS =====

// Filtrar categorías por estado
export const filterCategoriesByStatus = (categories, isActive = true) => {
    return categories.filter(category => category.selected_category === isActive);
};

// Buscar categorías por nombre
export const searchCategories = (categories, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return categories.filter(category => 
        category.nombre.toLowerCase().includes(term) ||
        category.descripcion.toLowerCase().includes(term)
    );
};

// Validar datos de categoría
export const validateCategoryData = (categoryData) => {
    const errors = [];

    if (!categoryData.nombre || categoryData.nombre.trim().length === 0) {
        errors.push('El nombre de la categoría es requerido');
    }

    if (!categoryData.descripcion || categoryData.descripcion.trim().length === 0) {
        errors.push('La descripción de la categoría es requerida');
    }

    if (categoryData.nombre && categoryData.nombre.trim().length < 2) {
        errors.push('El nombre de la categoría debe tener al menos 2 caracteres');
    }

    if (categoryData.descripcion && categoryData.descripcion.trim().length < 10) {
        errors.push('La descripción de la categoría debe tener al menos 10 caracteres');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
