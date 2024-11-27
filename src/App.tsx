import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesManagement from './pages/admin/Services';
import ClientDashboard from './pages/cliente/ClienteDashboard';
import MechanicDashboard from './pages/mecanico/MecanicoDashboard';
import Login from './pages/Login'
import VehiclesManagement from './pages/cliente/VehiclesManagement';
import OrdersManagement from './pages/cliente/OrdersManagement';
import OrdersManagementAdmin from './pages/admin/OrdersManagementAdmin';
import OrdersManagementMechanic from './pages/mecanico/OrdersManagementMechanic';
import UsersManagementAdmin from './pages/admin/UsersManagementAdmin';


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
                <Route path="/admin/orders" element={<OrdersManagementAdmin />} />
                <Route path="/admin/users" element={<UsersManagementAdmin />} />
                {/* Cliente */}
                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/vehicles" element={<VehiclesManagement />} />
                <Route path="/client/schedule" element={<OrdersManagement />} />

                {/* Mecánico */}
                <Route
                  path="/mechanic/dashboard"
                  element={<MechanicDashboard />}
                />
                <Route
                  path="/mechanic/orders"
                  element={<OrdersManagementMechanic />}
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
