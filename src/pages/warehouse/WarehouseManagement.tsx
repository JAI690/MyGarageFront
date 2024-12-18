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
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarehouseForm from './WarehouseForm';
import { fetchWarehouse, deleteWarehouseLocation } from '../../utils/apiClient';
import { WarehouseRecord } from '../../interfaces/Product';

const WarehouseManagement: React.FC = () => {
  const [locations, setLocations] = useState<WarehouseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<WarehouseRecord | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<WarehouseRecord | null>(null);

  // Cargar registros del almacén
  const loadLocations = async () => {
    setLoading(true);
    try {
      const response = await fetchWarehouse();
      setLocations(response);
    } catch (error) {
      console.error('Error al cargar registros del almacén:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (record: WarehouseRecord) => {
    setSelectedAssignment(record);
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

  // Filtrar registros
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.shelf.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular registros visibles en la página actual
  const visibleLocations = filteredLocations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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

      {/* Buscador */}
      <TextField
        fullWidth
        label="Buscar asignaciones"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        margin="normal"
        placeholder="Buscar por nombre del producto, zona o estante"
      />

      {/* Indicador de carga */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                {visibleLocations.map((record) => (
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

          {/* Paginación */}
          <TablePagination
            component="div"
            count={filteredLocations.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        </>
      )}

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
