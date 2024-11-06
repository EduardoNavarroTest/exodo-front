import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';

const SearchModal = ({ open, onClose, onSearch, searchOptions, data }) => {
    const [selectedOption, setSelectedOption] = useState(searchOptions[0]?.value || '');
    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState([]);


    useEffect(() => {
        if (data) {
            setRows(data);
        }
    }, [data]);

    // Efecto para limpiar los datos al cerrar el modal
    useEffect(() => {
        if (!open) {
            handleClear();
        }
    }, [open, data, searchOptions]);

    // Función que simula el filtrado de datos
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Simulamos un resultado de búsqueda filtrando las filas por el término de búsqueda
        const filteredRows = data.filter((row) => {
            if (selectedOption === 'code') {
                return row.code.includes(value.toUpperCase());
            } else if (selectedOption === 'name') {
                return row.name.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });

        setRows(filteredRows);
    };


    // Función para manejar la selección de un registro
    const handleSelect = (row) => {
        console.log('Registro seleccionado:', row);
        onSearch(row);
        onClose();
        // Aquí puedes agregar la lógica que necesites para manejar la selección
    };

    const handleClear = () => {
        setSelectedOption(searchOptions[0]?.value || '');
        setSearchTerm('');
        setRows(data);
    }


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Buscar Información</DialogTitle>
            <DialogContent>
                {/* Combo desplegable y campo de búsqueda alineados horizontalmente */}
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, marginTop: 1, alignItems: "center" }}>

                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Buscar por</InputLabel>
                        <Select
                            label="Buscar por"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            displayEmpty
                        >
                            {searchOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField

                        id="search-code"
                        label="Término de búsqueda"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        variant="outlined"
                    />

                </Box>

                {/* Tabla para mostrar los resultados filtrados */}
                <TableContainer component={Paper} sx={{ minHeight: 300, maxHeight: 300 }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: 'bold', minWidth: 40, maxWidth: 40 }}
                                >
                                    ID
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: 'bold', minWidth: 50, maxWidth: 50 }}
                                >
                                    Código
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: 'bold', minWidth: 100, maxWidth: 100 }}
                                >
                                    Nombre
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: 'bold', minWidth: 50, maxWidth: 50 }} // Ajustar tamaño del botón
                                >
                                    Ver
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center" sx={{ minWidth: 40, maxWidth: 40 }}>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: 50, maxWidth: 50 }}>
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: 100, maxWidth: 100 }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" sx={{ minWidth: 50, maxWidth: 50 }}>
                                            <Button onClick={() => handleSelect(row)}>
                                                <VisibilityIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        Not found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary" startIcon={< HighlightOffIcon />} >Cerrar</Button>
            </DialogActions>

        </Dialog >
    );
};

export default SearchModal;
