import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, List as ListIcon } from '@mui/icons-material';
import MinisterioFormDialog from '../../components/ministerios/MinisterioFormDialog';
import { ministerioService } from '../../services/ministerioService';
import { useNavigate } from 'react-router-dom';

const MinisteriosPage = () => {
  const [ministerios, setMinisterios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' } | null>(null);
  const [pagination, setPagination] = useState<{ cursor: string | null; hasNext: boolean; total: number }>({
    cursor: null,
    hasNext: false,
    total: 0,
  });
  // Removed unused theme
  const navigate = useNavigate();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchMinisterios = useCallback(async (cursor: string | null = null, reset: boolean = false) => {
    if (reset) {
      setLoading(true);
      setMinisterios([]); // Clear the current list when resetting
    } else if (cursor === null && !reset) {
      // Only load initial data if we're not resetting
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const result = await ministerioService.getMinisterios(10, cursor, debouncedSearchTerm);
      
      setPagination({
        cursor: result.cursor || null,
        hasNext: result.hasNext,
        total: result.total,
      });

      if (reset) {
        // Replace the entire list when resetting (e.g., after search or new item)
        setMinisterios(result.items);
      } else if (cursor) {
        // Append to the existing list when loading more
        setMinisterios(prev => [...prev, ...result.items]);
      } else {
        // Initial load
        setMinisterios(result.items);
      }
    } catch (error) {
      console.error('Erro ao carregar ministérios:', error);
      setSnackbar({ open: true, message: 'Erro ao carregar ministérios', severity: 'error' });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [debouncedSearchTerm]);

  // Fetch ministerios when debounced search term changes
  useEffect(() => {
    fetchMinisterios();
  }, [fetchMinisterios]);

  const handleNovoMinisterio = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccess = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
    fetchMinisterios(null, true);
    handleCloseDialog();
  };

  const handleError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleLoadMore = () => {
    if (pagination.hasNext && !loadingMore) {
      fetchMinisterios(pagination.cursor, false);
    }
  };

  const handleExcluirMinisterio = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este ministério?')) {
      try {
        // await ministerioService.excluir(id);
        setSnackbar({ open: true, message: 'Ministério excluído com sucesso!', severity: 'success' });
        fetchMinisterios(null, true);
      } catch (err) {
        setSnackbar({ open: true, message: 'Erro ao excluir ministério', severity: 'error' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Ministérios
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleNovoMinisterio}
        >
          Adicionar Ministério
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : ministerios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  Nenhum ministério encontrado
                </TableCell>
              </TableRow>
            ) : (
              ministerios.map((ministerio) => (
                <TableRow key={ministerio.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: ministerio.cor,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body1" noWrap>
                        {ministerio.nome}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{ministerio.descricao || '-'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => navigate(`/ministerios/editar/${ministerio.id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver Atividades">
                      <IconButton onClick={() => navigate(`/ministerios/${ministerio.id}/atividades`)}>
                        <ListIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton 
                        onClick={() => handleExcluirMinisterio(ministerio.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination.hasNext && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={handleLoadMore}
            disabled={loadingMore}
            startIcon={loadingMore ? <CircularProgress size={20} /> : null}
          >
            {loadingMore ? 'Carregando...' : 'Carregar mais'}
          </Button>
        </Box>
      )}

      <MinisterioFormDialog 
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        onError={handleError}
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

export default MinisteriosPage;
