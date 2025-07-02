import { setAuthToken, setCurrentUser, getAuthToken } from "../lib/auth";

// Base URL de la API (configurar según el entorno)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Función para login de administrador
export const loginAdmin = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email, 
                contraseña: password 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error en el login');
        }

        // Guardar token y información del usuario
        setAuthToken(data.token);
        setCurrentUser(data.user);

        return {
            success: true,
            user: data.user,
            token: data.token,
            message: data.message,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// Función para obtener todos los usuarios (requiere autenticación)
export const getAllUsers = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener usuarios');
        }

        return {
            success: true,
            users: data.users || data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

 