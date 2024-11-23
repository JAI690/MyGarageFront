import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { createService, updateService } from '../../utils/apiClient';

const ServiceForm: React.FC<{
  open: boolean;
  onClose: () => void;
  fetchServices: () => void;
  service?: any; // Servicio existente para editar
}> = ({ open, onClose, fetchServices, service }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  useEffect(() => {
    if (service) {
      // Preevaluar datos si es edición
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
      });
    } else {
      // Limpiar el formulario para un nuevo servicio
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
      });
    }
  }, [service]);

  const handleSubmit = async () => {
    try {
      if (service) {
        // Actualizar servicio
        await updateService(service.ServiceID, formData);
      } else {
        // Crear nuevo servicio
        await createService(formData);
      }
      fetchServices();
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Hubo un error guardando el servicio.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{service ? 'Editar Servicio' : 'Agregar Servicio'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <TextField
          label="Precio"
          fullWidth
          margin="normal"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <TextField
          label="Duración (min)"
          fullWidth
          margin="normal"
          type="number"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
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

export default ServiceForm;
