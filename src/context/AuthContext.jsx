import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
const API_URL = 'http://localhost:8080/api/session';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [prueba, setPrueba] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch(`${API_URL}/current`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false); 
            }
        };

        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, prueba }}>
            {children}
        </AuthContext.Provider>
    );
};
