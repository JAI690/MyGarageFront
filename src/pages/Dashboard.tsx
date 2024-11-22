import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdministradorDashboard, ClienteDashboard, MecanicoDashboard } from './Dashboard/index';
import { Typography } from '@mui/material';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Dashboard: React.FC = () => {
  const { role } = useAuth();

  const renderContent = () => {
    switch (role) {
      case 'Administrador':
        return <AdministradorDashboard />;
      case 'Cliente':
        return <ClienteDashboard />;
      case 'Mecánico':
        return <MecanicoDashboard />;
      default:
        return <Typography variant="h6">Rol no reconocido</Typography>;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <ThemeSwitcher />
      {renderContent()}
    </div>
  );
};

export default Dashboard;
