import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose, autoHideDuration = 6000 }) => (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
        <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);

export default CustomSnackbar;
