import { getAuthToken } from '../lib/auth.js';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper para hacer requests con autenticación
const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getAuthToken();
    
    if (!token) {
        throw new Error('No se encontró token de autenticación');
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        },
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
};

// Obtener logs recientes (últimos 50)
export const getRecentLogs = async () => {
    try {
        const data = await makeAuthenticatedRequest(`${API_BASE_URL}/logs/recent`);
        return {
            success: true,
            logs: data.data || [],
            message: 'Logs cargados exitosamente'
        };
    } catch (error) {
        console.error('Error getting recent logs:', error);
        return {
            success: false,
            error: error.message,
            logs: []
        };
    }
};

// Obtener logs con filtros y paginación
export const getLogs = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        // Agregar filtros a los query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });

        const url = `${API_BASE_URL}/logs${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const data = await makeAuthenticatedRequest(url);
        
        return {
            success: true,
            logs: data.data || [],
            pagination: data.pagination || {},
            message: 'Logs cargados exitosamente'
        };
    } catch (error) {
        console.error('Error getting logs:', error);
        return {
            success: false,
            error: error.message,
            logs: [],
            pagination: {}
        };
    }
};

// Obtener logs de una tabla específica
export const getLogsByTable = async (table, filters = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        // Agregar filtros a los query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });

        const url = `${API_BASE_URL}/logs/table/${table}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const data = await makeAuthenticatedRequest(url);
        
        return {
            success: true,
            logs: data.data || [],
            pagination: data.pagination || {},
            message: 'Logs cargados exitosamente'
        };
    } catch (error) {
        console.error('Error getting logs by table:', error);
        return {
            success: false,
            error: error.message,
            logs: [],
            pagination: {}
        };
    }
};

// Obtener logs de un usuario específico
export const getLogsByUser = async (userId, filters = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        // Agregar filtros a los query parameters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });

        const url = `${API_BASE_URL}/logs/user/${userId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const data = await makeAuthenticatedRequest(url);
        
        return {
            success: true,
            logs: data.data || [],
            pagination: data.pagination || {},
            message: 'Logs cargados exitosamente'
        };
    } catch (error) {
        console.error('Error getting logs by user:', error);
        return {
            success: false,
            error: error.message,
            logs: [],
            pagination: {}
        };
    }
};

// Obtener estadísticas de logs
export const getLogsStats = async (days = 30) => {
    try {
        const url = `${API_BASE_URL}/logs/stats?dias=${days}`;
        const data = await makeAuthenticatedRequest(url);
        
        return {
            success: true,
            stats: data.data || [],
            message: 'Estadísticas cargadas exitosamente'
        };
    } catch (error) {
        console.error('Error getting logs stats:', error);
        return {
            success: false,
            error: error.message,
            stats: []
        };
    }
};

// Helper para formatear la descripción de la acción
export const formatLogAction = (log) => {
    const actionMap = {
        'CREAR': 'creó',
        'ACTUALIZAR': 'actualizó',
        'ELIMINAR': 'eliminó',
        'RESTAURAR': 'restauró'
    };

    const tableMap = {
        'USERS': 'usuario',
        'CATEGORIAS': 'categoría',
        'PLATOS': 'plato'
    };

    const action = actionMap[log.accion] || log.accion.toLowerCase();
    const table = tableMap[log.tabla] || log.tabla.toLowerCase();
    
    return `${action} ${table}`;
};

// Helper para obtener el color según la acción
export const getActionColor = (action) => {
    const colorMap = {
        'CREAR': 'text-green-600',
        'ACTUALIZAR': 'text-blue-600',
        'ELIMINAR': 'text-red-600',
        'RESTAURAR': 'text-purple-600'
    };
    
    return colorMap[action] || 'text-gray-600';
};

// Helper para obtener el ícono según la acción
export const getActionIcon = (action) => {
    const iconMap = {
        'CREAR': 'Plus',
        'ACTUALIZAR': 'Edit',
        'ELIMINAR': 'Trash2',
        'RESTAURAR': 'RotateCcw'
    };
    
    return iconMap[action] || 'Activity';
};
