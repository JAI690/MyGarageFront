import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/apiClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/login', { email, password });
      const { token, role } = response.data;
      login(token, role); // Guardar el token y role en el contexto
      navigate('/dashboard'); // Redirigir al dashboard
    } catch (err) {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bienvenido a AutoGarage
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Por favor, inicia sesión para continuar.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo Electrónico"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          ¿Olvidaste tu contraseña?{' '}
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={() => alert('Funcionalidad pendiente')}
          >
            Recuperar acceso
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;

