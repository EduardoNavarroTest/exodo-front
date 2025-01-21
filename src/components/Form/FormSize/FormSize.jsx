import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { formContainerStyles } from '../formStyle.js';
import SearchModal from "../SearchModal/SearchModal.jsx";
import AlertDialog from '../../AlertDialog/AlertDialog.jsx';
import useApiSizes from '../../../hooks/api/useApiSizes.js';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar.jsx';

const FormSize = () => {
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [oldCode, setOldCode] = useState('');
    const [size, setSize] = useState('');
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
    const [data, setData] = useState([]);
    const [rowdata, setRowdata] = useState({});

    const { getSizeByCode, deleteSize, editSize, saveSize, getSizes } = useApiSizes();

    const sizeRef = useRef(null);
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
        createSize();
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleEdit = () => {
        updateSize();
        handleClear();
        setSearchCode(prev => !prev);
    };

    const handleClear = () => {
        setId('');
        setCode('');
        setOldCode('');
        setSize('');
        setDescription('');
        setStatus(true);
        setIsEditMode(false);
        setSearchCode(prev => !prev);
    };

    const handleDelete = () => {
        deleteSizeById();
        handleClear();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const getData = async () => {
        setLoading(true);
        try {
            const response = await getSizes();
            if (response && response.success) {
                setData(response.data);
            } else {
                setSnackbarMessage(response.error.message || 'Error al cargar las tallas');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                console.log(response.error.message || 'Error al cargar las tallas');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
            setLoading(false);
        }
    }

    const getByCode = async () => {
        setLoading(true);
        try {
            const response = await getSizeByCode(code);
            if (response && response.success) {
                const { id, code, name, description, status } = response.data;
                setIsEditMode(true);
                setId(id);
                setCode(code);
                setOldCode(code);
                setSize(name);
                setDescription(description);
                setStatus(status);
                setSnackbarMessage(`Código '${code} encontrado`);
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

    const createSize = async () => {
        setLoading(true);
        try {
            const response = await saveSize(code, size, description, status);
            console.log(response)
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

    const updateSize = async () => {
        setLoading(true);
        try {
            const response = await editSize(id, oldCode, code, size, description, status);
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

    const deleteSizeById = async () => {
        setLoading(true);
        try {
            const response = await deleteSize(id);
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

    const handleSearch = async() => {
        await getData();
        setIsSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    };

    const handleSearchAction = (selectedRow) => {
        if (!selectedRow) return; 
        
        setId(selectedRow.id);
        setCode(selectedRow.code);
        setOldCode(selectedRow.code);
        setSize(selectedRow.name); 
        setDescription(selectedRow.description);
        setStatus(selectedRow.status);
        setIsSearchOpen(false);
        setIsEditMode(true);
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
            sizeRef.current.focus();
        }
    };

    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "500px",
          margin: "0 auto",
          padding: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#0d6efd",
            marginBottom: 2,
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
                        <IconButton onClick={handleSearch} size="small">
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
                onSearch={(selectedRow) => handleSearchAction(selectedRow)}
                searchOptions={[
                    { label: 'Código', value: 'code' },
                    { label: 'Nombre', value: 'name' },
                ]}
                data={data}
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

export default FormSize;
