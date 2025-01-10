import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControlLabel,
    Switch,
    Grid,
    Typography,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

// Estilizamos el contenedor principal
const FormContainer = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: '800px',
    margin: '50px auto',
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        margin: '20px auto',
    },
}));

// Estilizamos los encabezados
const FormTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: '#333',
    fontSize: '1.5rem',
    textAlign: 'center',
}));

const FormProduct = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [formValues, setFormValues] = useState({
        barcode: '123456',
        name: 'Macbook Air M1',
        description: 'Macbook Air M1 de 13 Pulgadas',
        categoryId: 1,
        sizeId: 0,
        colorId: 1,
        price: 2000,
        stock: 10,
        image: 'https://via.placeholder.com/300',
        iva: 19,
        status: true,
        user: 'admin',
        date: '2022-02-02',
        userUpdate: 'admin',
        dateUpdate: '2024-11-13T18:21:56.708Z',
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Formulario enviado con los siguientes valores:', formValues);
    };

    const handleClear = () => {
        setFormValues({
            barcode: '',
            name: '',
            description: '',
            categoryId: 1,
            sizeId: 0,
            colorId: 1,
            price: 0,
            stock: 0,
            image: '',
            iva: 19,
            status: true,
            user: '',
            date: '',
            userUpdate: '',
            dateUpdate: '',
        });
    };

    return (
        <FormContainer elevation={3}>
            <FormTitle variant="h5" gutterBottom>
                Formulario de Producto
            </FormTitle>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Código de Barras"
                            name="barcode"
                            value={formValues.barcode}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre del Producto"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Descripción"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Categoría"
                            name="categoryId"
                            type="number"
                            value={formValues.categoryId}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Tamaño"
                            name="sizeId"
                            type="number"
                            value={formValues.sizeId}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Color"
                            name="colorId"
                            type="number"
                            value={formValues.colorId}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Precio"
                            name="price"
                            type="number"
                            value={formValues.price}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formValues.stock}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Imagen"
                            name="image"
                            type="url"
                            value={formValues.image}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="IVA (%)"
                            name="iva"
                            type="number"
                            value={formValues.iva}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="status"
                                    checked={formValues.status}
                                    onChange={handleChange}
                                    color="primary"
                                />
                            }
                            label="Activo"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{ flexGrow: 1, minWidth: 120 }}
                            >
                                {isEditMode ? 'Editar' : 'Guardar'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleClear}
                                startIcon={<HighlightOffIcon />}
                                sx={{ flexGrow: 1, minWidth: 120 }}
                            >
                                Limpiar
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                sx={{ flexGrow: 1, minWidth: 120 }}
                                disabled={!isEditMode}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </FormContainer>
    );
};

export default FormProduct;
