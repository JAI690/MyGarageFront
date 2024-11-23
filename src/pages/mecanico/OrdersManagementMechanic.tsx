import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { fetchOrdersByMechanic } from '../../utils/apiClient';

interface WorkOrder {
  OrderID: string;
  VehicleName: string;
  ServiceNames: string[];
  Status: string;
  CreatedAt: string;
}


const OrdersByMechanic: React.FC = () => {
  const [orders, setOrders] = useState<WorkOrder[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrdersByMechanic();
        console.log(response)
        setOrders(response || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    loadOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Órdenes Asignadas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de Orden</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Servicios</TableCell>
              <TableCell>Estado</TableCell>
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
      </TableContainer>
    </Container>
  );
};

export default OrdersByMechanic;
