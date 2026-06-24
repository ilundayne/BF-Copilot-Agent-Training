import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import LogoutIcon from '@mui/icons-material/Logout';

const Welcome = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const data = await authService.getProtectedData(user.token);
        setProtectedData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchProtectedData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WavingHandIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography component="h1" variant="h4" gutterBottom>
              ¡Bienvenido!
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                {error}
              </Alert>
            )}

            {protectedData && (
              <Box sx={{ mt: 3, textAlign: 'center', width: '100%' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {protectedData.message}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Usuario: <strong>{protectedData.user}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Has accedido exitosamente a una ruta protegida.
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ mt: 4 }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Welcome;
