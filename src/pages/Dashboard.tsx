import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdministradorDashboard, ClienteDashboard, MecanicoDashboard } from './Dashboard/index';
import { Typography } from '@mui/material';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Dashboard: React.FC = () => {
  const { role } = useAuth();

  const renderContent = () => {
    switch (role) {
      case 'Admin':
        return <AdministradorDashboard />;
      case 'Cliente':
        return <ClienteDashboard />;
      case 'Mecanico':
        return <MecanicoDashboard />;
      default:
        return <Typography variant="h6">Rol no reconocido</Typography>;
    }
  };

  return (
    <div>
      <ThemeSwitcher />
      {renderContent()}
    </div>
  );
};

export default Dashboard;
