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
  useTheme,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { Atividade } from '../../types/atividade';
import { atividadeService } from '../../services/atividadeService';
import { AtividadeFormDialog } from '../../components/atividades/AtividadeFormDialog';

export const AtividadesPage = () => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<Atividade | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchAtividades = useCallback(async (cursor?: string | null, isSearch: boolean = false) => {
    const isLoadingMore = cursor != null && !isSearch;
    isLoadingMore ? setLoadingMore(true) : setLoading(true);

    try {
      const data = await atividadeService.listar({
        nome: debouncedSearchTerm || undefined,
        limit: 10,
        cursor: cursor || undefined,
      });

      setAtividades(prev => (isLoadingMore ? [...prev, ...data.items] : data.items));
      setPagination({
        cursor: data.nextCursor || null,
        hasNext: data.hasNextPage,
        total: data.totalCount,
      });
    } catch (error) {
      console.error('Falha ao carregar atividades', error);
      setSnackbar({ open: true, message: 'Falha ao carregar atividades.', severity: 'error' });
    } finally {
      isLoadingMore ? setLoadingMore(false) : setLoading(false);
    }
  }, [debouncedSearchTerm]);

  // Fetch atividades when debounced search term changes
  useEffect(() => {
    fetchAtividades(null, true);
  }, [fetchAtividades]);

  const handleLoadMore = () => {
    if (pagination.hasNext && !loadingMore) {
      fetchAtividades(pagination.cursor, false);
    }
  };

  const handleNovoClick = () => {
    setSelectedAtividade(undefined);
    setIsDialogOpen(true);
  };

  const handleEditClick = (atividade: Atividade) => {
    setSelectedAtividade(atividade);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      return;
    }

    setDeletingId(id);
    try {
      await atividadeService.excluir(id);
      setAtividades(prev => prev.filter(a => a.id !== id));
      setSnackbar({ open: true, message: 'Atividade excluída com sucesso!', severity: 'success' });
    } catch (error) {
      console.error('Falha ao excluir atividade', error);
      setSnackbar({ open: true, message: 'Falha ao excluir a atividade.', severity: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccess = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
    fetchAtividades(null, true);
    handleCloseDialog();
  };

  const handleError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Atividades
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNovoClick}
        >
          Nova Atividade
        </Button>
      </Box>

      <Box mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar atividades..."
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
              <TableCell>Ministério</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && !loadingMore ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : atividades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  Nenhuma atividade encontrada.
                </TableCell>
              </TableRow>
            ) : (
              atividades.map((atividade) => (
                <TableRow key={atividade.id} hover>
                  <TableCell>{atividade.nome}</TableCell>
                  <TableCell>{atividade.descricao || '-'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={atividade.ministerio.nome} 
                      size="small"
                      sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton 
                        onClick={() => handleEditClick(atividade)}
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        onClick={() => handleDeleteClick(atividade.id)}
                        color="error"
                        size="small"
                        disabled={deletingId === atividade.id}
                      >
                        {deletingId === atividade.id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DeleteIcon />
                        )}
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
        <Box mt={3} display="flex" justifyContent="center">
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

      <AtividadeFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        onError={handleError}
        atividade={selectedAtividade}
      />

      <Snackbar
        open={!!snackbar?.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(null)} 
          severity={snackbar?.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AtividadesPage;
