import { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Save as SaveIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.jsx';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar.jsx';
import AlertDialog from '../../AlertDialog/AlertDialog.jsx';
import SearchModal from "../SearchModal/SearchModal.jsx";
import { formContainerStyles } from '../formStyle.js';

const ReusableForm = ({
    title,
    formFields,
    getDataByCode,
    saveData,
    editData,
    deleteData,
    searchOptions,
}) => {
    const [formValues, setFormValues] = useState({});
    const [status, setStatus] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const refs = formFields.reduce((acc, field) => {
        acc[field.name] = useRef(null);
        return acc;
    }, {});

    useEffect(() => {
        if (formValues.code) {
            handleSearch();
        }
    }, [formValues.code]);

    const handleInputChange = (name, value) => {
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleConfirmAction = () => {
        switch (actionType) {
            case 'save':
                handleSave();
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

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await saveData(formValues);
            setSnackbarMessage("Data guardada exitosamente");
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage(error.message || "Error al guardar data");
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setLoading(false);
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const response = await editData(formValues);
            setSnackbarMessage("Data editada exitosamente");
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage(error.message || "Error al editar data");
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteData(formValues.code);
            setSnackbarMessage("Data eliminada exitosamente");
            setSnackbarSeverity('success');
            handleClear();
        } catch (error) {
            setSnackbarMessage(error.message || "Error al eliminar data");
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setLoading(false);
    };

    const handleClear = () => {
        setFormValues({});
        setStatus(true);
        setIsEditMode(false);
    };

    const handleOpenDialog = (type) => {
        setOpenDialog(true);
        setActionType(type);
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await getDataByCode(formValues.code);
            if (response) {
                setIsEditMode(true);
                setFormValues(response.data);
                setSnackbarMessage("Código encontrado");
            } else {
                setIsEditMode(false);
                setSnackbarMessage("Código no encontrado");
            }
            setSnackbarSeverity('info');
        } catch (error) {
            setSnackbarMessage("Error al buscar código");
            setSnackbarSeverity('error');
        }
        setSnackbarOpen(true);
        setLoading(false);
    };

    return (


        <Box component="form" onSubmit={handleSubmit} sx={{
            ...formContainerStyles,
            maxWidth: '425px',
            width: '100%',
        }} >
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2, color: '#0d6efd' }}>
                {title}
            </Typography>

            {formFields.map((field) => (
                <TextField
                    key={field.name}
                    label={field.label}
                    variant="standard"
                    value={formValues[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    inputProps={{ maxLength: field.maxLength }}
                    required={field.required}
                    inputRef={refs[field.name]}
                    sx={{ marginBottom: 2 }}
                />
            ))}

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

            <AlertDialog open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={handleConfirmAction} actionType={actionType} />
            <LoadingSpinner loading={loading} />
            <CustomSnackbar open={snackbarOpen} onClose={handleCloseSnackbar} severity={snackbarSeverity} message={snackbarMessage} />
        </Box>
    );
};

export default ReusableForm;
