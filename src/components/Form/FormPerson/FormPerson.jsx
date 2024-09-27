import React, { useState } from 'react';
import { Button, Box, Typography, Switch, FormControlLabel, TextField, MenuItem, Grid } from '@mui/material';
import { formContainerStyles } from '../formStyle';

const FormPerson = () => {
    const [idType, setIdType] = useState('');
    const [idValue, setIdValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [active, setActive] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!idType || !idValue || !firstName || !lastName || !email || !phone || !address || !city || !gender) {
            console.log('Todos los campos son requeridos');
            return;
        }

        console.log({
            tipoIdentificacion: idType,
            valorIdentificacion: idValue,
            nombre: firstName,
            apellido: lastName,
            email: email,
            telefono: phone,
            direccion: address,
            ciudad: city,
            genero: gender,
            estado: active ? 'Activo' : 'Inactivo',
        });
    };

    const handleCancel = () => {
        setIdType('');
        setIdValue('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setCity('');
        setGender('');
        setActive(true);
    };

    return (
        <Box
            component="form"
            sx={{ ...formContainerStyles, width: '100%', maxWidth: 600 }} // Aumenta el ancho del formulario
            onSubmit={handleSubmit}
        >
            {/* Titulo */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 3,
                    color: '#0d6efd',
                }}
            >
                Creación de Persona
            </Typography>

            {/* Campos de entrada */}
            <Grid container spacing={2}>
                {/* Tipo de Identificación y Valor */}
                <Grid item xs={6}>
                    <TextField
                        required
                        id="idType"
                        label="Tipo Identificación"
                        variant="standard"
                        select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                        <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
                        <MenuItem value="CE">Cédula de Extranjería</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="idValue"
                        label="Valor Identificación"
                        variant="standard"
                        value={idValue}
                        onChange={(e) => setIdValue(e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Nombres y Apellidos */}
                <Grid item xs={6}>
                    <TextField
                        required
                        id="firstName"
                        label="Nombres"
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="lastName"
                        label="Apellidos"
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Email y Teléfono */}
                <Grid item xs={6}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="phone"
                        label="Teléfono"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Dirección y Ciudad */}
                <Grid item xs={6}>
                    <TextField
                        required
                        id="address"
                        label="Dirección"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="city"
                        label="Ciudad"
                        variant="standard"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Género */}
                <Grid item xs={6}>
                    <TextField
                        required
                        id="gender"
                        label="Género"
                        variant="standard"
                        select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

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

export default FormPerson;
