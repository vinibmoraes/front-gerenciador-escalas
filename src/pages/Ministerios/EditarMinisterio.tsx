import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ministerioService } from '../../services/ministerioService';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import MinisterioFormDialog from '../../components/ministerios/MinisterioFormDialog';

export const EditarMinisterio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchMinisterio = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const ministerio = await ministerioService.getMinisterioById(id);
        console.log('Ministério carregado:', ministerio);
      } catch (err) {
        console.error('Erro ao carregar ministério:', err);
        setError('Erro ao carregar os dados do ministério');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMinisterio();
    }
  }, [id]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/ministerios');
  };

  const handleSuccess = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
    setTimeout(() => {
      navigate('/ministerios');
    }, 1500);
  };

  const handleError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mt={4}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ministerios')}
            sx={{ mt: 2 }}
            startIcon={<ArrowBackIcon />}
          >
            Voltar para a lista
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/ministerios')}
          sx={{ mb: 2 }}
        >
          Voltar para a lista
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Ministério
        </Typography>
      </Box>

      <MinisterioFormDialog 
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        onError={handleError}
        // ministerioId={id}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar?.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditarMinisterio;
