import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Crear un contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Verificamos el token en las cookies (que lo establece el servidor)
        const token = Cookies.get('SESSIONID_EXODO');
        
        // Si el token está en las cookies, el usuario está autenticado
        if (token) {
            setAuthenticated(true);
        } else {
            // Si no hay token en cookies, revisamos en localStorage
            const tokenLocalStorage = localStorage.getItem('SESSIONID_EXODO');
            if (tokenLocalStorage) {
                setAuthenticated(true);
                // Si se encuentra en localStorage, lo podemos colocar en las cookies
                // (Aunque en este caso puede que no sea necesario ya que el token está en cookies por el servidor)
                Cookies.set('SESSIONID_EXODO', tokenLocalStorage, { secure: true, sameSite: 'Strict' });
            } else {
                setAuthenticated(false);
            }
        }
    }, []); 

    // Función para iniciar sesión (guardar token solo en localStorage)
    const login = (token) => {
        localStorage.setItem('SESSIONID_EXODO', token);
        setAuthenticated(true);
    };

    // Función para cerrar sesión (eliminar token de cookies y localStorage)
    const logout = () => {
        Cookies.remove('SESSIONID_EXODO');
        localStorage.removeItem('SESSIONID_EXODO');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => {
    return useContext(AuthContext);
};
