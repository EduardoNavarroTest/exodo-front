// LoadingSpinner.jsx
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({ loading }) => {
    if (!loading) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // Asegúrate de que esté por encima de otros elementos
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingSpinner;
