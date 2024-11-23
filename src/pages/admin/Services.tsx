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
import { deleteService, fetchServicesTableData, updateService } from '../../utils/apiClient';

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState([
    {
      ServiceID: '',
      name: '',
      description: '',
      price: '',
      duration: '',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null); // Guarda el servicio que se va a editar

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchServicesTableData();
        setServices(data);
      } catch (error) {
        console.error('Error loading services data:', error);
      }
    };
    loadData();
  }, []);

  const refreshTable = async () => {
    const data = await fetchServicesTableData(); // Recargar la tabla
    setServices(data);
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    refreshTable();
  };

  const handleEdit = (service: any) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gestión de Servicios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedService(null); // Crear un nuevo servicio
          setOpenDialog(true);
        }}
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
              <TableRow key={service.ServiceID}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{`$${service.price}`}</TableCell>
                <TableCell>{`${service.duration} min`}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(service)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service.ServiceID)}>
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
          fetchServices={refreshTable}
          service={selectedService} // Pasar el servicio seleccionado al formulario
        />
      )}
    </div>
  );
};

export default ServicesManagement;
