import { useEffect, useState } from 'react';

const useApiSizes = () => {
    const [existingCodes, setExistingCodes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:8080/api/sizes';

    useEffect(() => {
        const fetchSizes = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setExistingCodes(data);
            } catch (error) {
                setError(error);
                console.error('Error al cargar las tallas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSizes();
    }, []);

    const saveSize = async (code, name, description, status) => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, name, description, status }),
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            setExistingCodes((prev) => [...prev, data]);
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.error('Error al guardar la talla:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const deleteSize = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/code/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            setExistingCodes((prev) => prev.filter((size) => size.id !== id));
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.error('Error al eliminar la talla:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const editSize = async (id, code, size, description, status) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, size, description, status }),
            });
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            setExistingCodes((prev) =>
                prev.map((size) => (size.id === id ? data : size))
            );
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.error('Error al editar la talla:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const getSizeByCode = async (code) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/code/${code}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.error('Error al buscar la talla:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    return { existingCodes, error, loading, saveSize, deleteSize, editSize, getSizeByCode };
};

export default useApiSizes;
