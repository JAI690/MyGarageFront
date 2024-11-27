import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: { Name: string; Email: string; Role: string }) => void;
  selectedUser?: { UserID?: string; Name?: string; Email?: string; Role?: string };
}

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  onSubmit,
  selectedUser,
}) => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Role: '',
  });

  const roles = ['Admin', 'Cliente', 'Mecanico']; // Roles disponibles

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        Name: selectedUser.Name || '',
        Email: selectedUser.Email || '',
        Role: selectedUser.Role || '',
      });
    } else {
      setFormData({ Name: '', Email: '', Role: '' });
    }
  }, [selectedUser]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={formData.Name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <TextField
          label="Correo Electrónico"
          fullWidth
          margin="normal"
          value={formData.Email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <TextField
          label="Rol"
          fullWidth
          margin="normal"
          select
          value={formData.Role}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!formData.Name || !formData.Email || !formData.Role} // Validar campos obligatorios
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
