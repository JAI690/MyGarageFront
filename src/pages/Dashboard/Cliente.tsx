import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const ClienteDashboard: React.FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">Vehículos Registrados</Typography>
          <Typography variant="h4">2</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">Servicios en Curso</Typography>
          <Typography variant="h4">1</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default ClienteDashboard;
