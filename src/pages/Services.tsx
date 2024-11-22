import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ServiceForm from './ServiceForm';

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState([
    {
      id: '',
      name: '',
      description: '',
      price: '',
      duration: '',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    // Llamar al endpoint para obtener servicios
    const response = await fetch('/api/services');
    const data = await response.json();
    setServices(data);
  };

  const handleDelete = async (id: string) => {
    // Lógica para eliminar el servicio
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    fetchServices(); // Recargar la tabla
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gestión de Servicios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Agregar Servicio
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{`$${service.price}`}</TableCell>
                <TableCell>{`${service.duration} min`}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setSelectedService(service)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal de creación/edición */}
      {openDialog && (
        <ServiceForm
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fetchServices={fetchServices}
        />
      )}
    </div>
  );
};

export default ServicesManagement;
