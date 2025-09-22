import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Box, Chip, CircularProgress, Alert, Checkbox, ListItemText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ministerioService, Ministerio } from '../../services/ministerioService';
import { usuarioService } from '../../services/usuarioService';

// Validation Schema
const inviteSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('O e-mail fornecido não é válido'),
  ministeriosIds: z.array(z.string()).min(1, 'Selecione ao menos um ministério'),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onInviteSuccess: (message: string) => void;
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({ open, onClose, onInviteSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      nome: '',
      email: '',
      ministeriosIds: [],
    },
  });

  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [ministriesLoaded, setMinistriesLoaded] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const fetchMinisterios = async () => {
    if (ministriesLoaded) return;
    try {
      const data = await ministerioService.getMinisterios();
      setMinisterios(data.items);
      setMinistriesLoaded(true);
    } catch (err) {
      setServerError('Falha ao carregar ministérios.');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      setServerError(null);
      setMinisterios([]);
      setMinistriesLoaded(false);
    }, 300);
  };

  const onSubmit = async (data: InviteFormData) => {
    setServerError(null);
    try {
      const response = await usuarioService.inviteUsuario({
        Nome: data.nome,
        EmailAddress: data.email,
        MinisteriosIds: data.ministeriosIds,
      });
      await navigator.clipboard.writeText(response.link);
      onInviteSuccess('Convite enviado e link copiado para a área de transferência!');
      handleClose();
    } catch (err: any) {
      setServerError(err.message || 'Ocorreu um erro ao enviar o convite.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Convidar Novo Usuário</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  label="Nome Completo"
                  fullWidth
                  variant="outlined"
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Endereço de E-mail"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <FormControl fullWidth error={!!errors.ministeriosIds} disabled={isSubmitting}>
              <InputLabel id="ministerios-select-label">Ministérios</InputLabel>
              <Controller
                name="ministeriosIds"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="ministerios-select-label"
                    multiple
                    onOpen={fetchMinisterios}
                    input={<OutlinedInput label="Ministérios" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const ministerio = ministerios.find((m) => m.id === value);
                          return <Chip key={value} label={ministerio?.nome || value} />;
                        })}
                      </Box>
                    )}
                  >
                    {ministerios.map((ministerio) => (
                      <MenuItem key={ministerio.id} value={ministerio.id}>
                        <Checkbox checked={field.value.includes(ministerio.id)} />
                        <ListItemText primary={ministerio.nome} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.ministeriosIds && <Alert severity="error" sx={{ mt: 1 }}>{errors.ministeriosIds.message}</Alert>}
            </FormControl>
            {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 12px' }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Convidar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InviteUserDialog;

