import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesManagement from './pages/admin/Services';
import ClientDashboard from './pages/cliente/ClienteDashboard';
import MechanicDashboard from './pages/mecanico/MecanicoDashboard';
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta protegida con layout */}
        <Route path="/login" element={<Login/>}/>
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
