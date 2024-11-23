import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchVehiclesByUser, deleteVehicle } from '../../utils/apiClient';
import VehicleForm from './VehicleForm';

// Define el tipo para los vehículos
interface Vehicle {
  VehicleID: string;
  brand: string;
  model: string;
  year: string;
  plates: string;
}

const VehiclesManagement: React.FC = () => {
  // Estado con tipado explícito
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Cargar vehículos al montar el componente
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data: Vehicle[] = await fetchVehiclesByUser();
        setVehicles(data);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      }
    };

    loadVehicles();
  }, []);

  const refreshVehicles = async () => {
    const data: Vehicle[] = await fetchVehiclesByUser();
    setVehicles(data);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar este vehículo?');
    if (!confirm) return;

    try {
      await deleteVehicle(id);
      refreshVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Vehículos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedVehicle(null);
          setOpenDialog(true);
        }}
      >
        Añadir Vehículo
      </Button>
      <Grid container spacing={3} marginTop={3}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.VehicleID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{`${vehicle.brand} ${vehicle.model}`}</Typography>
                <Typography variant="body2">{`Año: ${vehicle.year}`}</Typography>
                <Typography variant="body2">{`Placas: ${vehicle.plates}`}</Typography>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    setOpenDialog(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(vehicle.VehicleID)}
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {openDialog && (
        <VehicleForm
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          selectedVehicle={selectedVehicle}
          refreshVehicles={refreshVehicles}
        />
      )}
    </Container>
  );
};

export default VehiclesManagement;
