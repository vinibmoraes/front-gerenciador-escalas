import React, { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import UserTable from '../../components/usuarios/UserTable';
import InviteUserDialog from '../../components/usuarios/InviteUserDialog';
import { usuarioService, Usuario } from '../../services/usuarioService';

const UsuariosPage = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [pagination, setPagination] = useState<{ cursor: string | null; hasNext: boolean; total: number }>({
    cursor: null,
    hasNext: false,
    total: 0,
  });

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchUsers = useCallback(async (cursor?: string | null, isSearch: boolean = false) => {
    const isLoadingMore = cursor != null && !isSearch;
    isLoadingMore ? setLoadingMore(true) : setLoading(true);

    try {
      const data = await usuarioService.getUsuarios(10, cursor, debouncedSearchTerm);
      setUsers(prevUsers => (isLoadingMore ? [...prevUsers, ...data.items] : data.items));
      setPagination({
        cursor: data.cursor,
        hasNext: data.hasNext,
        total: data.total,
      });
    } catch (error) {
      console.error('Failed to fetch users', error);
      setSnackbar({ open: true, message: 'Falha ao carregar usuários.', severity: 'error' });
    } finally {
      isLoadingMore ? setLoadingMore(false) : setLoading(false);
    }
  }, [debouncedSearchTerm]);

  // Fetch users when debounced search term changes
  useEffect(() => {
    fetchUsers(null, true); // isSearch = true to reset the list
  }, [fetchUsers]);

  const handleLoadMore = () => {
    if (pagination.hasNext && !loadingMore) {
      fetchUsers(pagination.cursor, false);
    }
  };

  const handleInviteSuccess = (message: string) => {
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const handleSnackbarClose = () => {
    setSnackbar(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Usuários
        </Typography>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={() => setDialogOpen(true)}>
          Convidar Usuário
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

      <UserTable users={users} loading={loading} />

      {pagination.hasNext && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={handleLoadMore} variant="outlined" disabled={loadingMore}>
            {loadingMore ? <CircularProgress size={24} /> : 'Carregar Mais'}
          </Button>
        </Box>
      )}

      <InviteUserDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        onInviteSuccess={handleInviteSuccess} 
      />

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

export default UsuariosPage;

