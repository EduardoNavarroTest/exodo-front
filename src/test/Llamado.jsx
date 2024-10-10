import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ConfirmationDialog from './ConfirmationDialog';

export default function Llamado() {
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleOpenDialog = (type) => {
    setActionType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmAction = () => {
    if (actionType === 'save') {
      // Lógica para guardar la información
      console.log('Información guardada.');
    } else if (actionType === 'delete') {
      // Lógica para eliminar los datos
      console.log('Datos eliminados.');
    }
    setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog('save')}>
        Guardar Información
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('delete')}>
        Eliminar Datos
      </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        title={actionType === 'save' ? 'Confirmar Guardado' : 'Confirmar Eliminación'}
        message={actionType === 'save'
          ? '¿Estás seguro de que deseas guardar esta información?'
          : '¿Estás seguro de que deseas eliminar estos datos?'}
      />
    </div>
  );
}
