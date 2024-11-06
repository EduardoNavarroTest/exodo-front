import { useEffect, useState } from 'react';

const useApiColors = () => {
    const [existingCodes, setExistingCodes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:8080/api/colors';

    useEffect(() => {
        const fetchColors = async () => {
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
                console.error('Error al cargar los colores:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchColors();
    }, []);

    const saveColor = async (code, name, description, status) => {
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
            console.error('Error al guardar el color:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const deleteColor = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/code/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }
            setExistingCodes((prev) => prev.filter((color) => color.id !== id));
            return { success: true, data };
        } catch (error) {
            setError(error);
            console.error('Error al eliminar el color:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const editColor = async (id, codeNew, nameNew, descriptionNew, statusNew) => {

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/code/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codeNew, nameNew, descriptionNew, statusNew }),
            });
            const data = await response.json();

            console.log(data)

            if (!response.ok) {
                throw new Error(data.error || 'Server error');
            }

            setExistingCodes((prev) =>
                prev.map((color) => (color.id === id ? data : color))
            );
            return { success: true, data };
        } catch (error) {
            console.warn(error)
            setError(error);
            console.error('Error al editar el color:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    const getColorByCode = async (code) => {
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
            console.warn('Error al buscar el color:', error);
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    };

    return { existingCodes, error, loading, saveColor, deleteColor, editColor, getColorByCode };
};

export default useApiColors;
