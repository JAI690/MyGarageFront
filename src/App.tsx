import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import AdminDashboard from './pages/Dashboard/Admin';
import ServicesManagement from './pages/Services';
import ClientDashboard from './pages/Dashboard/Cliente';
import MechanicDashboard from './pages/Dashboard/Mecanico';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta protegida con layout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                {/* Administrador */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<ServicesManagement />} />

                {/* Cliente */}
                <Route path="/client/dashboard" element={<ClientDashboard />} />

                {/* Mecánico */}
                <Route
                  path="/mechanic/dashboard"
                  element={<MechanicDashboard />}
                />

                {/* Perfil */}
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
