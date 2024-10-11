import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { formContainerStyles } from '../formStyle.js';
import SearchModal from "../SearchModal/SearchModal.jsx";
import AlertDialog from '../../AlertDialog/AlertDialog.jsx';
import useApiSizes from '../../../hooks/api/useApiSizes.js';

const FormSize = () => {
    const [code, setCode] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchCode, setSearchCode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const { existingCodes, error, getSizeByCode, deleteSize, editSize, saveSize } = useApiSizes();

    // Referencias para los inputs
    const sizeRef = useRef(null);
    const descriptionRef = useRef(null);
    const codeRef = useRef(null);



    useEffect(() => {
        if (code) {
            getByCode();
        }
    }, [searchCode]);

    const handleConfirmAction = () => {
        if (actionType === 'save') {
            handleCreate();
        } else if (actionType === 'edit') {
            handleEdit();
        }
        else if (actionType === 'delete') {
            handleDelete();
        }
        setOpenDialog(false);
    };

     const handleSubmit = (event) => {
        event.preventDefault(); // Evitar el envío del formulario por defecto
    
        handleOpenDialog(isEditMode ? 'edit' : 'save');
        
    };

    const handleCreate = () => {
        setActionType('save');
        createSize();
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleEdit = () => {
        setActionType('edit');
        editSize(code, size, description, status);
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleClear = () => {
        setCode('');
        setSize('');
        setDescription('');
        setStatus(true);
        setIsEditMode(false);
        setSearchCode(prev => !prev);

    };

    const handleDelete = () => {
        deleteSizeById(code);
        handleClear();
    };




    const getByCode = async () => {
        try {
            const response = await getSizeByCode(code);
            if (response && response.success) {
                const { code, name, description, status } = response.data;
                setIsEditMode(true);
                setCode(code);
                setSize(name);
                setDescription(description);
                setStatus(status);
            } else {
                setIsEditMode(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsEditMode(false);
        }
    };

    const createSize = async () => {
        try {
            const response = await saveSize(code, size, description, status);
            if (response && response.success) {
                console.log("Talla guardada exitosamente");
            }
        } catch (error) {
            console.error("Error al crear la talla:", error);
        }
    };

    const deleteSizeById = async (id) => {
        try {
            const response = await deleteSize(id);
            if (response && response.success) {
                console.log("Talla eliminada exitosamente");
            }
        } catch (error) {
            console.error("Error al eliminar la talla:", error);
        }
    };



    const handleOpenDialog = (type) => {
        setOpenDialog(true);
        setActionType(type);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleSearch = () => {
        setIsSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    };

    const handleSearchAction = () => {
        console.log(`Buscando el registro con código: ${code}`);
        setIsSearchOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    // Manejo de navegación en inputs
    const handleKeyDownCode = async (event) => {

        if (event.key === 'Enter' || event.key === 'Tab') {
            setSearchCode(prev => !prev);
            event.preventDefault();

            const foundCode = await getSizeByCode(code);

            if (foundCode.code) {
                setSize(foundCode.name);
                setDescription(foundCode.description);
                setStatus(foundCode.status);
            }
            sizeRef.current.focus();
        }
    };



    return (
        <Box
            component="form"
            sx={{
                ...formContainerStyles,
                maxWidth: '425px',
                width: '100%',
            }}
            onSubmit={handleSubmit}
        >
            {/* Titulo */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 2,
                    color: '#0d6efd',
                }}
            >
                Maestro de Tallas
            </Typography>

            {/* Campo de código con icono de búsqueda */}
            <TextField
                id="code"
                label="Código"
                variant="standard"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDownCode}
                inputProps={{ maxLength: 2 }}
                required
                inputRef={codeRef}
                sx={{
                    marginBottom: 2,
                    '& .MuiInputAdornment-root': {
                        marginRight: 0,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={handleSearch}
                            size="small"
                        >
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />

            <TextField
                required
                id="size"
                label="Talla"
                variant="standard"
                value={size}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSize(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ marginBottom: 2 }}
                inputRef={sizeRef}
            />

            <TextField
                id="description"
                label="Descripción"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                inputProps={{ maxLength: 50 }}
                sx={{ marginBottom: 2 }}
                inputRef={descriptionRef}
            />

            {/* Switch */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: 1 }}>
                <FormControlLabel
                    control={
                        <Switch checked={status} onChange={(e) => setStatus(e.target.checked)} onKeyDown={handleKeyDown} />
                    }
                    label="Activo"
                />
            </Box>

            {/* Botones */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    sx={{ flexGrow: 1, minWidth: 120, textTransform: 'none' }}
                >
                    {isEditMode ? 'Editar' : 'Guardar'}
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClear}
                    startIcon={<HighlightOffIcon />}
                    sx={{ flexGrow: 1, minWidth: 120, textTransform: 'none' }}
                >
                    Limpiar
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDialog('delete')}
                    startIcon={<DeleteIcon />}
                    sx={{ flexGrow: 1, minWidth: 120, textTransform: 'none' }}
                    disabled={!isEditMode}
                >
                    Eliminar
                </Button>
            </Box>

            {/* Modal separado */}
            <SearchModal
                open={isSearchOpen}
                onClose={handleCloseSearch}
                onSearch={handleSearchAction}
                searchOptions={[
                    { label: 'Código', value: 'code' },
                    { label: 'Nombre', value: 'name' },
                ]}
            />

            {/* Modal de confirmación */}
            <AlertDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmAction}
                title={
                    actionType === 'save' ? "Confirmar Guardado" :
                        actionType === 'edit' ? "Confirmar Edición" :
                            actionType === 'delete' ? "Confirmar Eliminación" :
                                ""
                }
                message={
                    actionType === 'save' ? '¿Estás seguro de que deseas guardar esta información?' :
                        actionType === 'edit' ? '¿Estás seguro de que deseas editar esta información?' :
                            actionType === 'delete' ? '¿Estás seguro de que deseas eliminar estos datos?' :
                                ''
                }
            />
        </Box>
    );
};

export default FormSize;
