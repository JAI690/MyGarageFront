import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface WarehouseFormProps {
  open: boolean;
  onClose: () => void;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asignar Producto a Almacén</DialogTitle>
      <DialogContent>
        {/* Aquí va el contenido del formulario */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehouseForm;
