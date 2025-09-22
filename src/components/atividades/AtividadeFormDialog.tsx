import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import { Atividade } from '../../types/atividade';
import { atividadeService } from '../../services/atividadeService';
import { Ministerio, ministerioService } from '../../services/ministerioService';

interface AtividadeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  atividade?: Atividade;
}

export const AtividadeFormDialog: React.FC<AtividadeFormDialogProps> = ({
  open,
  onClose,
  onSuccess,
  onError,
  atividade,
}) => {
  const [loading, setLoading] = useState(false);
  const [ministerios, setMinisterios] = useState<Ministerio[]>([]);
  const [formData, setFormData] = useState<Omit<Atividade, 'id' | 'dataCriacao'>>({
    nome: '',
    descricao: '',
    ministerio: { id: '', nome: '' },
  });

  useEffect(() => {
    if (open) {
      const fetchMinisterios = async () => {
        try {
          const data = await ministerioService.getMinisterios();
          setMinisterios(data.items);
        } catch (error) {
          console.error('Erro ao carregar ministérios', error);
          onError('Falha ao carregar a lista de ministérios');
        }
      };

      fetchMinisterios();

      if (atividade) {
        setFormData({
          nome: atividade.nome,
          descricao: atividade.descricao || '',
          ministerio: atividade.ministerio,
        });
      } else {
        setFormData({
          nome: '',
          descricao: '',
          ministerio: ministerios[0] ? { id: ministerios[0].id, nome: ministerios[0].nome } : { id: '', nome: '' },
        });
      }
    }
  }, [open, atividade, ministerios.length]);


  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    
    if (name === 'ministerioId') {
      const selectedMinisterio = ministerios.find(m => m.id === value);
      setFormData(prev => ({
        ...prev,
        ministerio: selectedMinisterio || { id: value as string, nome: '' }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name as string]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (atividade) {
        await atividadeService.atualizar(atividade.id, formData);
        onSuccess('Atividade atualizada com sucesso!');
      } else {
        await atividadeService.criar(formData);
        onSuccess('Atividade criada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar atividade', error);
      onError('Falha ao salvar a atividade. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {atividade ? 'Editar Atividade' : 'Nova Atividade'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="nome"
              label="Nome"
              value={formData.nome}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              disabled={loading}
            />
            
            <TextField
              name="descricao"
              label="Descrição"
              value={formData.descricao}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            
            <FormControl fullWidth margin="normal" disabled={loading}>
              <InputLabel id="ministerio-label">Ministério</InputLabel>
              <Select
                labelId="ministerio-label"
                name="ministerioId"
                value={formData.ministerio?.id || ''}
                label="Ministério"
                required
              >
                {ministerios.map((ministerio) => (
                  <MenuItem key={ministerio.id} value={ministerio.id}>
                    {ministerio.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {atividade ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AtividadeFormDialog;
