import React, { useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAuth } from '../context/AuthContext';
import { isTokenExpired } from '../utils/tokenVerify';

const drawerWidth = 240;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { role } = useAuth(); // Obtén el rol del usuario para definir las opciones del menú
  const { token, logout } = useAuth();


  useEffect(() => {
    if (token && isTokenExpired(token) || !token) {
      logout();
      navigate('/login');
    }
  }, [token, logout]);

  // Define las opciones del menú basado en el rol
  const menuOptions: Record<
    string,
    { text: string; icon: JSX.Element; path: string }[] | undefined
  > = {
    Admin: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
      {
        text: 'Gestión de Servicios',
        icon: <BuildIcon />,
        path: '/admin/services',
      },
      {
        text: 'Gestión de Usuarios',
        icon: <PeopleIcon />,
        path: '/admin/users',
      },
    ],
    Cliente: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/client/dashboard' },
      {
        text: 'Gestión de Vehículos',
        icon: <DirectionsCarIcon />,
        path: '/client/vehicles',
      },
      {
        text: 'Agendar Servicio',
        icon: <BuildIcon />,
        path: '/client/schedule',
      },
    ],
    Mecánico: [
      {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/mechanic/dashboard',
      },
      {
        text: 'Órdenes Asignadas',
        icon: <BuildIcon />,
        path: '/mechanic/orders',
      },
    ],
  };

  const menuItems = role ? menuOptions[role] || [] : [];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" noWrap>
            AutoGarage
          </Typography>
        </Box>
        <List>
          {menuItems.map(
            (
              item: { path: string; icon: JSX.Element; text: string },
              index: number,
            ) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
