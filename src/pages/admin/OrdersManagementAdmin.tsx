import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from '@mui/material';
import { fetchPendingOrders, fetchMechanics, assignMechanic } from '../../utils/apiClient';

interface Order {
  OrderID: string;
  VehicleName: string;
  ServiceNames: string[];
  Status: string;
}

interface Mechanic {
  MechanicID: string;
  Name: string;
}

const OrdersManagementAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedMechanicId, setSelectedMechanicId] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadOrdersAndMechanics = async () => {
      try {
        const ordersData = await fetchPendingOrders();
        const mechanicsData = await fetchMechanics();
        setOrders(ordersData);
        setMechanics(mechanicsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadOrdersAndMechanics();
  }, []);

  const handleAssignMechanic = async () => {
    if (!selectedOrderId || !selectedMechanicId) {
      alert('Seleccione una orden y un mecánico.');
      return;
    }

    try {
      await assignMechanic(selectedOrderId, selectedMechanicId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.OrderID === selectedOrderId
            ? { ...order, Status: 'Assigned', AssignedTo: selectedMechanicId }
            : order
        )
      );
      setOpenDialog(false);
      setSelectedOrderId(null);
      setSelectedMechanicId('');
    } catch (error) {
      console.error('Error assigning mechanic:', error);
      alert('Error al asignar mecánico.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Órdenes Pendientes
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de Orden</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Servicios</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.OrderID}>
                <TableCell>{order.OrderID}</TableCell>
                <TableCell>{order.VehicleName}</TableCell>
                <TableCell>{order.ServiceNames.join(', ')}</TableCell>
                <TableCell>{order.Status}</TableCell>
                <TableCell>
                <Button
                    sx={{
                      textTransform: 'none',
                    }}
                    variant="contained"
                    color="primary"
                    size="small" // Cambia el tamaño del botón
                    onClick={() => {
                        setSelectedOrderId(order.OrderID);
                        setOpenDialog(true);
                      }}
                    style={{ textTransform: 'none', margin: '5px 0' }} // Opcional: ajustes adicionales de estilo
                    >
                    Asignar Mecánico
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para asignar mecánico */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Asignar Mecánico</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Seleccionar Mecánico"
            fullWidth
            value={selectedMechanicId}
            onChange={(e) => setSelectedMechanicId(e.target.value)}
          >
            {mechanics.map((mechanic) => (
              <MenuItem key={mechanic.MechanicID} value={mechanic.MechanicID}>
                {mechanic.Name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleAssignMechanic}>
            Asignar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersManagementAdmin;
