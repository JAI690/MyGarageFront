import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const MecanicoDashboard: React.FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">Órdenes Asignadas</Typography>
          <Typography variant="h4">3</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">Órdenes Completadas</Typography>
          <Typography variant="h4">15</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default MecanicoDashboard;
