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
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, PersonAdd } from '@mui/icons-material';
import { voluntarioService, Voluntario } from '../../services/voluntarioService';
import { VoluntarioFormDialog } from '../../components/voluntarios/VoluntarioFormDialog';

const VoluntariosPage = () => {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' } | null>(null);
  const [pagination, setPagination] = useState<{ cursor: string | null; hasNext: boolean; total: number }>({
    cursor: null,
    hasNext: false,
    total: 0,
  });
  const theme = useTheme();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchVoluntarios = useCallback(async (cursor?: string | null, isSearch: boolean = false) => {
    const isLoadingMore = cursor != null && !isSearch;
    isLoadingMore ? setLoadingMore(true) : setLoading(true);

    try {
      const data = await voluntarioService.getVoluntarios(10, cursor, debouncedSearchTerm);
      setVoluntarios(prev => (isLoadingMore ? [...prev, ...data.items] : data.items));
      setPagination({
        cursor: data.nextCursor || null,
        hasNext: data.hasNextPage,
        total: data.total,
      });
    } catch (error) {
      console.error('Failed to fetch voluntários', error);
      setSnackbar({ open: true, message: 'Falha ao carregar voluntários.', severity: 'error' });
    } finally {
      isLoadingMore ? setLoadingMore(false) : setLoading(false);
    }
  }, [debouncedSearchTerm]);

  // Fetch voluntarios when debounced search term changes
  useEffect(() => {
    fetchVoluntarios(null, true);
  }, [fetchVoluntarios]);

  const handleLoadMore = () => {
    if (pagination.hasNext && !loadingMore) {
      fetchVoluntarios(pagination.cursor, false);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNovoVoluntario = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccess = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
    fetchVoluntarios(null, true);
    handleCloseDialog();
  };

  const handleError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleExcluirVoluntario = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este voluntário?')) {
      try {
        // await voluntarioService.excluir(id);
        setSnackbar({ open: true, message: 'Voluntário excluído com sucesso!', severity: 'success' });
        fetchVoluntarios(null, true);
      } catch (err) {
        setSnackbar({ open: true, message: 'Erro ao excluir voluntário', severity: 'error' });
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Voluntários
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleNovoVoluntario}
          startIcon={<PersonAdd />}
        >
          Novo Voluntário
        </Button>
        <VoluntarioFormDialog 
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSuccess={handleSuccess}
          onError={handleError}
        />
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
              <TableCell>Ministérios</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && !voluntarios.length ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : voluntarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  Nenhum voluntário encontrado
                </TableCell>
              </TableRow>
            ) : (
              voluntarios.map((voluntario) => (
                <TableRow hover key={voluntario.id}>
                  <TableCell>{voluntario.nome}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {voluntario.ministerios?.map((ministerio, index) => (
                        <Chip 
                          key={index}
                          label={ministerio.nome}
                          size="small"
                          sx={{ 
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            fontSize: '0.7rem',
                            height: '24px'
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton 
                        onClick={() => {}}
                        color="primary"
                        size="small"
                        disabled
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton 
                        onClick={() => handleExcluirVoluntario(voluntario.id)}
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
            {loadingMore && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination.hasNext && !loading && !loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={handleLoadMore} variant="outlined">
            Carregar Mais
          </Button>
        </Box>
      )}

      {snackbar && (
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default VoluntariosPage;
