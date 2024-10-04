import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';

const SearchModal = ({ open, onClose, onSearch, searchOptions }) => {
    const [selectedOption, setSelectedOption] = useState(searchOptions[0]?.value || '');
    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState([]);

    // Función que simula el filtrado de datos
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Simulamos un resultado de búsqueda filtrando las filas por el término de búsqueda
        const filteredRows = mockData.filter((row) => {
            if (selectedOption === 'code') {
                return row.code.includes(value.toUpperCase());
            } else if (selectedOption === 'name') {
                return row.name.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });

        setRows(filteredRows);
    };

    // Datos simulados
    const mockData = [
        { id: 1, code: 'CO', name: 'Colombia' },
        { id: 2, code: 'US', name: 'United States' },
        { id: 3, code: 'VE', name: 'Venezuela' },
        { id: 4, code: 'BR', name: 'Brazil' },
        { id: 5, code: 'PE', name: 'Peru' },
        { id: 6, code: 'ES', name: 'España' },
        { id: 7, code: 'FR', name: 'Francia' },
        { id: 8, code: 'RS', name: 'Rusia' },
        { id: 9, code: 'CO', name: 'Cocolombia' },
        { id: 10, code: 'RU', name: 'Imperio del Reino Unido de Gran Bretaña e Irlanda del Norte' },
        { id: 11, code: 'RU', name: 'Reino Unido' },
    ];

    // Función para manejar la selección de un registro
    const handleSelect = (row) => {
        console.log('Registro seleccionado:', row);
        // Aquí puedes agregar la lógica que necesites para manejar la selección
    };


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
