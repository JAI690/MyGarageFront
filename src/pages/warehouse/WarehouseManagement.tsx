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
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarehouseForm from './WarehouseForm';
import { fetchWarehouse, deleteWarehouseLocation } from '../../utils/apiClient';
import { WarehouseRecord } from '../../interfaces/Product';

const WarehouseManagement: React.FC = () => {
  const [locations, setLocations] = useState<WarehouseRecord[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<WarehouseRecord | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<WarehouseRecord | null>(null);

  // Cargar registros del almacén
  const loadLocations = async () => {
    try {
      const response = await fetchWarehouse();
      setLocations(response);
    } catch (error) {
      console.error('Error al cargar registros del almacén:', error);
    }
  };

  const handleEdit = (record: WarehouseRecord) => {
    setSelectedAssignment({
      WarehouseID: record.WarehouseID,
      ProductID: record.ProductID,
      name: record.name,
      zone: record.zone,
      shelf: record.shelf,
      rack: record.rack,
      niche: record.niche,
    });
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;

    try {
      await deleteWarehouseLocation(recordToDelete.WarehouseID);
      setLocations((prev) => prev.filter((loc) => loc.WarehouseID !== recordToDelete.WarehouseID));
    } catch (error) {
      console.error('Error al eliminar registro:', error);
    } finally {
      setDeleteDialogOpen(false);
      setRecordToDelete(null);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((record) => (
              <TableRow key={record.WarehouseID}>
                <TableCell>{record.WarehouseID}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.zone}</TableCell>
                <TableCell>{record.shelf}</TableCell>
                <TableCell>{record.rack}</TableCell>
                <TableCell>{record.niche}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(record)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setRecordToDelete(record);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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

      {/* Confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>¿Estás seguro de que deseas eliminar esta asignación?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WarehouseManagement;
