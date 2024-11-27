import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import UserForm from './UserForm';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../utils/apiClient';

interface User {
  UserID: string;
  Name: string;
  Email: string;
  Role: string;
}

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    role: string;
  }
  
interface UpdateUserInput {
    name: string;
    email: string;
    role: string;
}
  

const UsersManagementAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    loadUsers();
  }, []);

  const handleSaveUser = async (userData: { Name: string; Email: string; Role: string }) => {
    try {
      if (selectedUser?.UserID) {
        // Para actualizar, no se requiere password
        const updateData: UpdateUserInput = {
          name: userData.Name,
          email: userData.Email,
          role: userData.Role,
        };
        await updateUser(selectedUser.UserID, updateData);
      } else {
        // Para crear, se requiere password
        const createData: CreateUserInput = {
          name: userData.Name,
          email: userData.Email,
          password: 'defaultPassword', // Aquí puedes solicitar un input o asignar un valor por defecto
          role: userData.Role,
        };
        await createUser(createData);
      }
  
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };  
  

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedUser(null);
          setOpenDialog(true);
        }}
      >
        Crear Usuario
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.UserID}>
                <TableCell>{user.UserID}</TableCell>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.UserID!)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSaveUser}
        selectedUser={selectedUser || undefined}
        />
    </>
  );
};

export default UsersManagementAdmin;
