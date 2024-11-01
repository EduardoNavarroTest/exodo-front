import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Server error');
                }
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }


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
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }
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

    const editSize = async (id, codeNew, nameNew, descriptionNew, statusNew) => {

        setLoading(true);
        try {
            const existingCode = await getSizeByCode(codeNew);
            console.log(existingCode);

            if ((id !== codeNew) && existingCode.success) {
                console.log('La nueva talla ya existe');
                return { success: false, error: 'La nueva talla ingresada ya existe' };
            }

            const response = await fetch(`${API_URL}/code/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codeNew, nameNew, descriptionNew, statusNew }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }

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
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.warn('Error al buscar la talla:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    return { existingCodes, error, loading, saveSize, deleteSize, editSize, getSizeByCode 
        
    };
};

export default useApiSizes;
