// FormSize.jsx
import { useState, useEffect } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { formContainerStyles } from '../formStyle';
import SearchModal from "../SearchModal/SearchModal.jsx";

const FormSize = () => {
    const [code, setCode] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingCodes, setExistingCodes] = useState(['CO', 'US']);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Estado para el modal de búsqueda

    useEffect(() => {
        if (existingCodes.includes(code)) {
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    }, [code]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!code) {
            console.log('El código es requerido');
            return;
        }

        console.log({
            codigo: code,
            estadoCivil: size,
            descripcion: description,
            estado: status ? 'Activo' : 'Inactivo',
        });

        if (isEditMode) {
            console.log('Actualizando el registro existente...');
        } else {
            console.log('Guardando nuevo registro...');
        }
    };

    const handleCancel = () => {
        setCode('');
        setSize('');
        setDescription('');
        setStatus(true);
    };

    const handleDelete = () => {
        console.log(`Eliminando el registro con código: ${code}`);
        handleCancel();
    };

    const handleSearch = () => {
        setIsSearchOpen(true); // Abre el modal de búsqueda
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false); // Cierra el modal de búsqueda
    };

    const handleSearchAction = () => {
        console.log(`Buscando el registro con código: ${code}`);
        setIsSearchOpen(false); // Cierra el modal después de la búsqueda
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
                inputProps={{ maxLength: 2 }}
                required
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
                onChange={(e) => setSize(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ marginBottom: 2 }}
            />

            <TextField
                id="description"
                label="Descripción"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 50 }}
                sx={{ marginBottom: 2 }}
            />

            {/* Switch */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: 1 }}>
                <FormControlLabel
                    control={
                        <Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />
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
                    onClick={handleCancel}
                    startIcon={<HighlightOffIcon />}
                    sx={{ flexGrow: 1, minWidth: 120, textTransform: 'none' }}
                >
                    Limpiar
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
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
        </Box>
    );
};

export default FormSize;
