import { useState } from 'react';

const API_URL = 'http://localhost:8080/api/session';

const useApiSessions = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Login function
    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // Permite el manejo de cookies
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data)
                throw new Error(data.message || 'Error al iniciar sesión');
            }
            console.log(data)
            setUser(data);
            return { success: true, data };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/logout`, {credentials: 'include'}, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }
            setUser(null);
            return { success: true };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Check current session using JWT from cookies
    const checkSession = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/current`, {
                credentials: 'include' // Envía cookies al servidor
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'No hay sesión activa');
            }
            setUser(data.user);
        } catch (error) {
            setError(error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        error,
        loading,
        login,
        logout,
        checkSession
    };
};

export default useApiSessions;
