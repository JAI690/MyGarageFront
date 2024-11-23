import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { createVehicle, updateVehicle } from '../../utils/apiClient';

const VehicleForm: React.FC<{
  open: boolean;
  onClose: () => void;
  selectedVehicle: any;
  refreshVehicles: () => void;
}> = ({ open, onClose, selectedVehicle, refreshVehicles }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    plates: '',
  });

  useEffect(() => {
    if (selectedVehicle) {
      setFormData({
        brand: selectedVehicle.brand || '',
        model: selectedVehicle.model || '',
        year: selectedVehicle.year || '',
        plates: selectedVehicle.plates || '',
      });
    } else {
      setFormData({
        brand: '',
        model: '',
        year: '',
        plates: '',
      });
    }
  }, [selectedVehicle]);

  const handleSubmit = async () => {
    try {
      if (selectedVehicle) {
        await updateVehicle(selectedVehicle.VehicleID, formData);
      } else {
        await createVehicle(formData);
      }
      refreshVehicles();
      onClose();
    } catch (error) {
      console.error('Error submitting vehicle form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedVehicle ? 'Editar Vehículo' : 'Añadir Vehículo'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Marca"
          fullWidth
          margin="normal"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />
        <TextField
          label="Modelo"
          fullWidth
          margin="normal"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
        />
        <TextField
          label="Año"
          fullWidth
          margin="normal"
          type="number"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />
        <TextField
          label="Placas"
          fullWidth
          margin="normal"
          value={formData.plates}
          onChange={(e) => setFormData({ ...formData, plates: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm;
