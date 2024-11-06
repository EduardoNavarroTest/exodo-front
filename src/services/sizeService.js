// sizeService.js
import useApiSizes from '../../../hooks/api/useApiSizes.js';

export const useSizeService = () => {
    const { getSizeByCode, deleteSize, editSize, saveSize } = useApiSizes();

    const fetchSizeByCode = async (code) => {
        const response = await getSizeByCode(code);
        return response;
    };

    const createSize = async (code, size, description, status) => {
        const response = await saveSize(code, size, description, status);
        return response;
    };

    const updateSizeById = async (oldCode, code, size, description, status) => {
        const response = await editSize(oldCode, code, size, description, status);
        return response;
    };

    const deleteSizeById = async (code) => {
        const response = await deleteSize(code);
        return response;
    };

    return { fetchSizeByCode, createSize, updateSizeById, deleteSizeById };
};
