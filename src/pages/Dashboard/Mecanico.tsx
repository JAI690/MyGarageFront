import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { fetchMechanicDashboardData } from '../../services/apiClient';

const MechanicDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    assignedOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMechanicDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading mechanic dashboard data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard de Mecánico
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Órdenes Asignadas</Typography>
              <Typography variant="h4">{dashboardData.assignedOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Órdenes Completadas</Typography>
              <Typography variant="h4">{dashboardData.completedOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MechanicDashboard;
