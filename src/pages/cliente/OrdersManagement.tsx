import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
} from '@mui/material';
import { getClientOrders, fetchVehiclesByUser, fetchServicesTableData, createWorkOrder } from '../../utils/apiClient';

interface WorkOrder {
  OrderID: string;
  VehicleName: string;
  ServiceNames: string[];
  Status: string;
  CreatedAt: string;
}

interface Vehicle {
  VehicleID: string;
  brand: string;
  model: string;
}

interface Service {
  ServiceID: string;
  name: string;
}


const ClientOrders: React.FC = () => {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: '',
    selectedServices: [] as string[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getClientOrders();
        const vehiclesData = await fetchVehiclesByUser();
        const servicesData = await fetchServicesTableData();
        setOrders(ordersData);
        setVehicles(vehiclesData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlecreateWorkOrder = async () => {
    if (!formData.vehicleId || formData.selectedServices.length === 0) {
      alert('Por favor selecciona un vehículo y al menos un servicio.');
      return;
    }

    try {
      await createWorkOrder({
        vehicleId: formData.vehicleId,
        services: formData.selectedServices,
      });
      setOpenDialog(false);
      alert('Orden creada exitosamente.');
      // Refrescar las órdenes después de crear
      const updatedOrders = await getClientOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Hubo un problema al crear la orden.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ marginBottom: 2 }}
      >
        Agendar Servicio
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de Orden</TableCell>
            <TableCell>Vehículo</TableCell>
            <TableCell>Servicios</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Fecha de Creación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.OrderID}>
              <TableCell>{order.OrderID}</TableCell>
              <TableCell>{order.VehicleName}</TableCell>
              <TableCell>{order.ServiceNames.join(', ')}</TableCell>
              <TableCell>{order.Status}</TableCell>
              <TableCell>{new Date(order.CreatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* Diálogo para agendar servicio */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agendar Servicio</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Selecciona un vehículo"
            fullWidth
            margin="normal"
            value={formData.vehicleId}
            onChange={(e) =>
              setFormData({ ...formData, vehicleId: e.target.value })
            }
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.VehicleID} value={vehicle.VehicleID}>
                {`${vehicle.brand} ${vehicle.model}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Selecciona servicios"
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
            value={formData.selectedServices}
            onChange={(e) =>
              setFormData({
                ...formData,
                selectedServices: Array.isArray(e.target.value) ? e.target.value : [e.target.value],
              })
            }
          >
            {services.map((service) => (
              <MenuItem key={service.ServiceID} value={service.ServiceID}>
                {service.name}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlecreateWorkOrder}
          >
            Crear Orden
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientOrders;
