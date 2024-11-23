import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { fetchClientDashboardData } from '../../utils/apiClient';

const ClientDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    registeredVehicles: 0,
    ongoingServices: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchClientDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading client dashboard data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard de Cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Vehículos Registrados</Typography>
              <Typography variant="h4">
                {dashboardData.registeredVehicles}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Servicios en Curso</Typography>
              <Typography variant="h4">
                {dashboardData.ongoingServices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDashboard;
