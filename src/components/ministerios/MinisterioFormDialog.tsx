import React, { useState, useEffect } from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { ministerioService, AtividadeLookup } from '../../services/ministerioService';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  Chip,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ETipoCor } from '../../enums/ETipoCor';
// Cores pré-definidas para seleção
const CORES_PRE_DEFINIDAS = [
  { valor: '#3B82F6', tipo: ETipoCor.Hex, nome: 'Azul' }, // blue-500
  { valor: '#10B981', tipo: ETipoCor.Hex, nome: 'Verde' }, // emerald-500
  { valor: '#F59E0B', tipo: ETipoCor.Hex, nome: 'Âmbar' }, // amber-500
  { valor: '#EF4444', tipo: ETipoCor.Hex, nome: 'Vermelho' }, // red-500
  { valor: '#8B5CF6', tipo: ETipoCor.Hex, nome: 'Violeta' }, // violet-500
  { valor: '#EC4899', tipo: ETipoCor.Hex, nome: 'Rosa' }, // pink-500
  { valor: '#06B6D4', tipo: ETipoCor.Hex, nome: 'Ciano' }, // cyan-500
  { valor: '#F97316', tipo: ETipoCor.Hex, nome: 'Laranja' }, // orange-500
  { valor: '#84CC16', tipo: ETipoCor.Hex, nome: 'Lima' }, // lime-500
  { valor: '#14B8A6', tipo: ETipoCor.Hex, nome: 'Verde-água' }, // teal-500
];

// Validation Schema
const ministerioSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  descricao: z.string().optional(),
  cor: z.string().min(1, 'Cor é obrigatória'),
  tipoCor: z.number().min(0).max(2, 'Tipo de cor inválido'),
}).refine(data => {
  // Additional validation for color format based on tipoCor
  const { cor, tipoCor } = data;
  switch (tipoCor) {
    case ETipoCor.Hex:
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(cor);
    case ETipoCor.Rgb:
      return /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(cor);
    case ETipoCor.Hsl:
      return /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(cor);
    default:
      return false;
  }
}, {
  message: 'Formato de cor inválido para o tipo selecionado',
  path: ['cor']
});

type MinisterioFormData = z.infer<typeof ministerioSchema>;

interface MinisterioFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  ministerioId?: string;
  atividades?: string[];
}

const MinisterioFormDialog: React.FC<MinisterioFormDialogProps> = ({
  open,
  onClose,
  onSuccess,
  onError,
  ministerioId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CORES_PRE_DEFINIDAS[0]);
  const [atividades, setAtividades] = useState<AtividadeLookup[]>([]);
  const [selectedAtividades, setSelectedAtividades] = useState<string[]>([]);
  
  
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MinisterioFormData>({
    resolver: zodResolver(ministerioSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      cor: '#4D4D4D',
      tipoCor: ETipoCor.Hex,
    },
  });

  // Carrega atividades e dados do ministério quando o ID estiver disponível
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carrega a lista de atividades
        const atividadesData = await ministerioService.getAtividadesLookup();
        setAtividades(atividadesData);
        
        // Se for edição, carrega os dados do ministério
        if (ministerioId) {
          const ministerio = await ministerioService.getMinisterioById(ministerioId);
          console.log('Dados do ministério carregados:', ministerio);
          
          // Encontra a cor correspondente nas cores pré-definidas
          const corSelecionada = CORES_PRE_DEFINIDAS.find(c => c.valor === ministerio.cor) || CORES_PRE_DEFINIDAS[0];
          
          // Preenche o formulário com os dados do ministério
          reset({
            nome: ministerio.nome,
            descricao: ministerio.descricao || '',
            cor: ministerio.cor,
            tipoCor: corSelecionada.tipo,
          });
          
          setSelectedColor(corSelecionada);
          
          // Define as atividades selecionadas (se houver)
          if ((ministerio as any).atividades) {
            setSelectedAtividades((ministerio as any).atividades.map((a: any) => a.id));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        onError('Erro ao carregar os dados do ministério');
      }
    };
    
    loadData();
  }, [ministerioId, reset, onError]);

  const handleColorChange = (cor: typeof CORES_PRE_DEFINIDAS[0]) => {
    setSelectedColor(cor);
    setValue('cor', cor.valor, { shouldValidate: true });
    setValue('tipoCor', cor.tipo, { shouldValidate: true });
  };

  const handleAtividadeChange = (event: { target: { value: unknown } }) => {
    const { value } = event.target;
    setSelectedAtividades(Array.isArray(value) ? value : [String(value)]);
  };

  const onSubmit = async (data: MinisterioFormData) => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        nome: data.nome.trim(),
        descricao: data.descricao?.trim() || null,
        cor: {
          valor: selectedColor.valor,
          tipo: selectedColor.tipo
        },
        atividadesIds: selectedAtividades
      };
      
      console.log('Enviando payload:', JSON.stringify(payload, null, 2));
      
      if (ministerioId) {
        // Atualizar ministério existente
        await ministerioService.atualizarMinisterio(ministerioId, payload as any);
        onSuccess('Ministério atualizado com sucesso!');
      } else {
        // Criar novo ministério
        await ministerioService.adicionarMinisterio(payload as any);
        onSuccess('Ministério cadastrado com sucesso!');
      }
      
      handleClose();
    } catch (error: any) {
      console.error('Erro ao cadastrar ministério:', error);
      
      // Verifica se é um erro de validação (status 400)
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        
        // Se houver erros de validação específicos
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .map((msg: any) => `• ${msg}`)
            .join('\n');
          
          onError(`Erro de validação:\n${errorMessages}`);
          return;
        }
        
        // Se houver uma mensagem de erro direta
        if (errorData.message) {
          onError(`Erro: ${errorData.message}`);
          return;
        }
      }
      
      // Outros erros de rede/API
      if (error.message) {
        onError(`Erro: ${error.message}`);
      } else {
        onError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={isSubmitting ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {ministerioId && control._formValues?.nome 
          ? `Editar ${control._formValues.nome}` 
          : 'Adicionar Novo Ministério'
        }
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <FormControl fullWidth variant="outlined" error={!!(errors as FieldErrors<{ atividades: string[] }>).atividades}>
              <InputLabel id="atividades-label">Atividades</InputLabel>
              <Select
                labelId="atividades-label"
                id="atividades"
                multiple
                value={selectedAtividades}
                onChange={handleAtividadeChange}
                input={<OutlinedInput label="Atividades" />}
                renderValue={(selected: unknown) => { 
                  const selectedValues = selected as string[];
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedValues.map((value) => (
                        <Chip 
                          key={value} 
                          label={atividades.find((a: AtividadeLookup) => a.id === value)?.nome || value}
                          size="small"
                        />
                      ))}
                    </Box>
                  );
                }}
                disabled={isSubmitting}
              >
                {atividades.map((atividade) => (
                  <MenuItem key={atividade.id} value={atividade.id}>
                    <Checkbox checked={selectedAtividades.indexOf(atividade.id) > -1} />
                    <ListItemText primary={atividade.nome} />
                  </MenuItem>
                ))}
              </Select>
              {(errors as FieldErrors<{ atividades: string[] }>).atividades && (
                <FormHelperText>{(errors as FieldErrors<{ atividades: string[] }>).atividades?.message}</FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2">
                  Cor do Ministério
                </Typography>
              </Box>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Selecione uma cor:
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  mb: 2
                }}>
                  {CORES_PRE_DEFINIDAS.map((cor) => (
                    <Box 
                      key={cor.valor}
                      onClick={() => handleColorChange(cor)}
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: cor.valor,
                        cursor: 'pointer',
                        border: selectedColor.valor === cor.valor 
                          ? '3px solid #1976d2' 
                          : '1px solid #e0e0e0',
                        position: 'relative',
                        '&:hover': {
                          opacity: 0.9,
                          transform: 'scale(1.05)',
                          transition: 'all 0.2s',
                        },
                      }}
                      title={cor.nome}
                    >
                      {selectedColor.valor === cor.valor && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: '#1976d2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                          }}
                        >
                          ✓
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  mt: 2,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: '#f5f5f5'
                }}>
                  <Box 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '4px', 
                      backgroundColor: selectedColor.valor,
                      border: '1px solid #ccc',
                      flexShrink: 0
                    }} 
                  />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedColor.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedColor.valor}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Controller
                name="tipoCor"
                control={control}
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={handleClose} 
            disabled={isSubmitting}
            color="inherit"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MinisterioFormDialog;
