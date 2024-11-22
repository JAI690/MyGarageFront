import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const AdministradorDashboard: React.FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Servicios Activos</Typography>
          <Typography variant="h4">10</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Ingresos del Mes</Typography>
          <Typography variant="h4">$50,000</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">Órdenes en Progreso</Typography>
          <Typography variant="h4">5</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default AdministradorDashboard;
