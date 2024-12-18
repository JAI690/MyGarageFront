import React, { useState, useEffect } from 'react';
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
import { WarehouseRecord, WarehouseRecordInput } from '../../interfaces/Product';
import { fetchWarehouse } from '../../utils/apiClient';

const WarehouseManagement: React.FC = () => {
  const [locations, setLocations] = useState<WarehouseRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<WarehouseRecordInput | null>(null);

  // Cargar registros del almacén
  const loadLocations = async () => {
    try {
      const response = await fetchWarehouse();
      setLocations(response as WarehouseRecord[]);
    } catch (error) {
      console.error('Error al cargar registros del almacén:', error);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleAssignProduct = async (assignment: {
    ProductID: string;
    zone: string;
    shelf: string;
    rack: string;
    niche: string;
  }) => {
    try {
      // Aquí puedes realizar la lógica para crear o actualizar la asignación
      console.log(selectedAssignment ? 'Actualizando asignación' : 'Nueva asignación', assignment);

      // Recargar los registros después de guardar
      await loadLocations();
    } catch (error) {
      console.error('Error al asignar producto:', error);
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

      {/* Tabla de asignaciones */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID del Almacén</TableCell>
              <TableCell>Nombre del Producto</TableCell>
              <TableCell>Zona</TableCell>
              <TableCell>Estante</TableCell>
              <TableCell>Rack</TableCell>
              <TableCell>Nicho</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((record) => (
              <TableRow key={record.WarehouseID}>
                <TableCell>{record.WarehouseID}</TableCell>
                <TableCell>{record.productName || 'Producto desconocido'}</TableCell>
                <TableCell>{record.zone}</TableCell>
                <TableCell>{record.shelf}</TableCell>
                <TableCell>{record.rack}</TableCell>
                <TableCell>{record.niche}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario de asignación */}
      <WarehouseForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={loadLocations}
        selectedAssignment={selectedAssignment || undefined}
      />
    </Container>
  );
};

export default WarehouseManagement;
