import React, { useState } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField } from '@mui/material';
import { formContainerStyles } from '../formStyle';

const FormIdType = () => {
    const [code, setCode] = useState('');
    const [gender, setGender] = useState('');
    const [active, setActive] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!code) {
            console.log('El código es requerido');
            return;
        }

        console.log({
            codigo: code,
            genero: gender,
            estado: active ? 'Activo' : 'Inactivo',
        });
    };

    const handleCancel = () => {
        setCode('');
        setGender('');
        setActive(true);
    };

    return (
        <Box
            component="form"
            sx={formContainerStyles}
            onSubmit={handleSubmit}
        >
            {/* Titulo */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 1,
                    color: '#0d6efd',
                }}
            >
                Creación de Tipos de Identificación
            </Typography>


            {/* Campos de entrada */}
            <TextField
                id="code"
                label="Código"
                variant="standard"
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase())}  
                inputProps={{ maxLength: 2 }}
                required  
                fullWidth
                sx={{ marginBottom: 2 }}  
            />

            <TextField
                required
                id="typeId"
                label="Nombre"
                variant="standard"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                inputProps={{ maxLength: 25 }}
                fullWidth
                sx={{ marginBottom: 2 }}  
            />

            {/* Switch */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: 0 }}>
                <FormControlLabel
                    control={
                        <Switch checked={active} onChange={(e) => setActive(e.target.checked)} />
                    }
                    label="Activo"
                />
            </Box>

            {/* Botones */}
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100, textTransform: 'none' }}>
                    Guardar
                </Button>
                <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ minWidth: 100, textTransform: 'none' }}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};

export default FormIdType;
