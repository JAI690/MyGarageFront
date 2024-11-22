import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { fetchAdminDashboardData } from '../../services/apiClient';

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    activeServices: 0,
    monthlyRevenue: 0,
    ongoingOrders: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAdminDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading admin dashboard data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard de Administrador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Servicios Activos</Typography>
              <Typography variant="h4">{dashboardData.activeServices}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ingresos del Mes</Typography>
              <Typography variant="h4">${dashboardData.monthlyRevenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Órdenes en Progreso</Typography>
              <Typography variant="h4">{dashboardData.ongoingOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
