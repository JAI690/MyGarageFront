import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import WarehouseForm from './WarehouseForm';

const WarehouseManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Almacén
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
      >
        Asignar Producto a Almacén
      </Button>
      <WarehouseForm open={isDialogOpen} onClose={handleCloseDialog} />
    </Container>
  );
};

export default WarehouseManagement;
