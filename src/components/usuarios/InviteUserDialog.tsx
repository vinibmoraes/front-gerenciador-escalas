import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ministerioService, Ministerio } from '../../services/ministerioService';
import { usuarioService } from '../../services/usuarioService';

interface InviteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onInviteSuccess: (message: string) => void;
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({ open, onClose, onInviteSuccess }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [selectedMinisterios, setSelectedMinisterios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const fetchMinisterios = async () => {
        try {
          const data = await ministerioService.getMinisterios();
          setMinisterios(data);
        } catch (err) {
          setError('Falha ao carregar ministérios.');
        }
      };
      fetchMinisterios();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    // Reset state on close
    setTimeout(() => {
        setNome('');
        setEmail('');
        setSelectedMinisterios([]);
        setError(null);
    }, 300);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await usuarioService.inviteUsuario({
        Nome: nome,
        EmailAddress: email,
        MinisteriosIds: selectedMinisterios,
      });
      
      await navigator.clipboard.writeText(response.link);
      onInviteSuccess('Convite enviado e link copiado para a área de transferência!');
      handleClose();

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao enviar o convite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Convidar Novo Usuário</DialogTitle>
      <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome Completo"
              type="text"
              fullWidth
              variant="outlined"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="dense"
              id="email"
              label="Endereço de E-mail"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <FormControl fullWidth disabled={loading}>
              <InputLabel id="ministerios-select-label">Ministérios</InputLabel>
              <Select
                labelId="ministerios-select-label"
                id="ministerios-select"
                multiple
                value={selectedMinisterios}
                onChange={(e) => setSelectedMinisterios(e.target.value as string[])}
                input={<OutlinedInput id="select-multiple-chip" label="Ministérios" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const ministerio = ministerios.find(m => m.id === value);
                      return <Chip key={value} label={ministerio?.nome || value} />;
                    })}
                  </Box>
                )}
              >
                {ministerios.map((ministerio) => (
                  <MenuItem key={ministerio.id} value={ministerio.id}>
                    {ministerio.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 12px' }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Convidar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteUserDialog;

