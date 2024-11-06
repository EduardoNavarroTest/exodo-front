import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, onClose, onConfirm, actionType }) {

    const titleMap = {
        save: "Confirmar Guardado",
        edit: "Confirmar Edición",
        delete: "Confirmar Eliminación",
    };

    const messageMap = {
        save: '¿Estás seguro de que deseas guardar esta información?',
        edit: '¿Estás seguro de que deseas editar esta información?',
        delete: '¿Estás seguro de que deseas eliminar estos datos?',
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{titleMap[actionType]}</DialogTitle>
            
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {messageMap[actionType]}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary"  >
                    Cancelar
                </Button>
                <Button onClick={onConfirm} autoFocus color='primary'>
                    Confirmar
                </Button>
            </DialogActions>

        </Dialog>
    );
}
