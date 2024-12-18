import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import WarehouseForm from './WarehouseForm';
import { WarehouseRecord } from '../../interfaces/Product';
import { fetchWarehouse } from '../../utils/apiClient';

const WarehouseManagement: React.FC = () => {
const [locations, setLocations] = useState<WarehouseRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<WarehouseRecord | null>(null);

  const loadProducts = async () => {
    const response = await fetchWarehouse();
    console.log(response)
    setLocations(response as WarehouseRecord[]);
  };

  const handleAssignProduct = (assignment: {
    ProductID: string;
    zone: string;
    shelf: string;
    rack: string;
    niche: string;
  }) => {
    if (selectedAssignment) {
      // Editar asignación
      console.log('Actualizando asignación:', assignment);
    } else {
      // Crear nueva asignación
      console.log('Nueva asignación:', assignment);
    }
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Almacén
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedAssignment(null);
          setOpenDialog(true);
        }}
        sx={{ marginBottom: 2 }}
      >
        Asignar Producto a Ubicación
      </Button>

      <WarehouseForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={loadProducts}
        selectedAssignment={selectedAssignment || undefined}
      />
    </Container>
  );
};

export default WarehouseManagement;
