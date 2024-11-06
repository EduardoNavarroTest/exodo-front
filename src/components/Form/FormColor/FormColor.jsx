import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { formContainerStyles } from '../formStyle.js';
import SearchModal from "../SearchModal/SearchModal.jsx";
import AlertDialog from '../../AlertDialog/AlertDialog.jsx';
import useApicolors from '../../../hooks/api/useApicolors.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar.jsx';

const Formcolor = () => {
    const [code, setCode] = useState('');
    const [oldCode, setOldCode] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchCode, setSearchCode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { getcolorByCode, deletecolor, editcolor, savecolor } = useApiColors();

    const colorRef = useRef(null);
    const descriptionRef = useRef(null);
    const codeRef = useRef(null);

    useEffect(() => {
        if (code) {
            getByCode();
        }
    }, [searchCode]);

    const handleConfirmAction = () => {

        switch (actionType) {
            case 'save':
                handleCreate();
                break;
            case 'edit':
                handleEdit();
                break; 
            case 'delete':
                handleDelete();
                break;
        }
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleOpenDialog(isEditMode ? 'edit' : 'save');
    };

    const handleCreate = () => {
        createcolor();
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleEdit = () => {
        updatecolor();
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleClear = () => {
        setCode('');
        setOldCode('');
        setColor('');
        setDescription('');
        setStatus(true);
        setIsEditMode(false);
        setSearchCode(prev => !prev);
    };

    const handleDelete = () => {
        deletecolorById();
        handleClear();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const getByCode = async () => {
        setLoading(true);
        try {
            const response = await getcolorByCode(code);
            console.warn(response);
            if (response && response.success) {
                const { code, name, description, status } = response.data;
                setIsEditMode(true);
                setCode(code);
                setOldCode(code);
                setColor(name);
                setDescription(description);
                setStatus(status);
                setSnackbarMessage(`Código '${code}' encontrado`);
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
            } else {
                setIsEditMode(false);
                setSnackbarMessage(`Código '${code}' no encontrado`);
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
                console.log(response.error.message || 'Error al buscar la talla');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSnackbarMessage(error || "Error al buscar código");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const createcolor = async () => {
        setLoading(true);
        try {
            const response = await savecolor(code, color, description, status);
            if (response && response.success) {
                setSnackbarMessage("Talla guardada exitosamente");
                setSnackbarSeverity('success');
            } else {
                console.log(response.error.message || "Error al crear la talla");
                setSnackbarMessage(response.error.message || "Error al crear la talla");
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        } catch (error) {
            //El vale nunca entra por acá, por que????
            setSnackbarMessage(`Error al crear la talla: ${error.message || error}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.log("Holissss")
        }
        setLoading(false);
    };

    const updatecolor = async () => {
        setLoading(true);
        try {
            const response = await editcolor(oldCode, code, color, description, status);
            if (response && response.success) {
                setSnackbarMessage("Talla editada exitosamente");
                setSnackbarSeverity('success');
            } else {
                console.log(response.error || "Error al editar la talla");
                setSnackbarMessage(response.error.message || "Error al editar la talla");
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(`Error al editar la talla: ${error.message || error}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const deletecolorById = async () => {
        setLoading(true);
        try {
            const response = await deletecolor(code);
            if (response && response.success) {
                setSnackbarMessage("Talla eliminada exitosamente");
                setSnackbarSeverity('success');
            } else {
                setSnackbarMessage(response.error.message || "Error al eliminar la talla");
                setSnackbarSeverity('error');
                console.log(response.error.message || "Error al eliminar la talla");
            }
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(`Error al eliminar la talla: ${error.message || error}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
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

    const handleKeyDownCode = async (event) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            setSearchCode(prev => !prev);
            event.preventDefault();
            await getByCode();
            colorRef.current.focus();
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
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSearch} color="small">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />

            <TextField
                required
                id="color"
                label="Talla"
                variant="standard"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ marginBottom: 2 }}
                inputRef={colorRef}
            />

            <TextField
                id="description"
                label="Descripción"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 50 }}
                sx={{ marginBottom: 2 }}
                inputRef={descriptionRef}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: 1 }}>
                <FormControlLabel
                    control={
                        <Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />
                    }
                    label="Activo"
                />
            </Box>

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

            <SearchModal
                open={isSearchOpen}
                onClose={handleCloseSearch}
                onSearch={handleSearchAction}
                searchOptions={[
                    { label: 'Código', value: 'code' },
                    { label: 'Nombre', value: 'name' },
                ]}
            />

            <AlertDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmAction}
                actionType={actionType}
            />

            <LoadingSpinner loading={loading} />

           <CustomSnackbar open={snackbarOpen} onClose={handleCloseSnackbar} severity={snackbarSeverity} message={snackbarMessage} />
            
        </Box>
    );
};

export default Formcolor;
