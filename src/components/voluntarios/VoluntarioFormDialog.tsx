import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { voluntarioService } from '../../services/voluntarioService';

interface VoluntarioFormData {
  nome: string;
  email: string;
  celular: {
    ddd: string;
    numero: string;
  };
  cpf: string;
  dataNascimento: Date | null;
}

interface VoluntarioFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const VoluntarioFormDialog: React.FC<VoluntarioFormDialogProps> = ({
  open,
  onClose,
  onSuccess,
  onError,
}) => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<VoluntarioFormData>({
    defaultValues: {
      nome: '',
      email: '',
      celular: {
        ddd: '',
        numero: ''
      },
      cpf: '',
      dataNascimento: null,
    },
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, numbers.length-4)}-${numbers.slice(-4)}`;
    return `${numbers.slice(0, numbers.length-4)}-${numbers.slice(-4)}`;
  };

  const onSubmit = async (data: VoluntarioFormData) => {
    try {
      setIsSubmitting(true);
      
      const formattedData = {
        nome: data.nome.trim(),
        email: data.email.trim() || null,
        celular: data.celular.ddd && data.celular.numero
          ? {
              ddd: data.celular.ddd.replace(/\D/g, '').substring(0, 2),
              numero: data.celular.numero.replace(/\D/g, '').substring(0, 9)
            }
          : null,
        cpf: data.cpf ? data.cpf.replace(/\D/g, '') : null,
        dataNascimento: data.dataNascimento 
          ? format(data.dataNascimento, 'yyyy-MM-dd')
          : null,
        origemCadastro: 0
      };

      await voluntarioService.adicionarVoluntario(formattedData);
      
      onSuccess('Voluntário cadastrado com sucesso!');
      handleClose();
    } catch (error) {
      console.error('Erro ao cadastrar voluntário:', error);
      onError('Erro ao cadastrar voluntário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={isSubmitting ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Adicionar Novo Voluntário</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="nome"
              control={control}
              rules={{
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter pelo menos 3 caracteres',
                },
                maxLength: {
                  value: 100,
                  message: 'Nome não pode ter mais de 100 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome Completo *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.nome}
                  helperText={errors.nome?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido',
                },
                maxLength: {
                  value: 100,
                  message: 'E-mail não pode ter mais de 100 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="celular.ddd"
                control={control}
                rules={{
                  required: 'DDD é obrigatório',
                  validate: (value) => {
                    const ddd = value?.replace(/\D/g, '');
                    return ddd?.length === 2 || 'DDD deve ter 2 dígitos';
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="DDD"
                    variant="outlined"
                    value={value || ''}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, '').substring(0, 2);
                      onChange(numbers);
                    }}
                    onBlur={(e) => {
                      const numbers = e.target.value.replace(/\D/g, '');
                      if (numbers.length === 2) {
                        e.target.value = `(${numbers})`;
                      }
                    }}
                    error={!!errors.celular?.ddd}
                    helperText={errors.celular?.ddd?.message}
                    disabled={isSubmitting}
                    placeholder="(99)"
                    sx={{ width: '100px' }}
                  />
                )}
              />
              <Controller
                name="celular.numero"
                control={control}
                rules={{
                  required: 'Número é obrigatório',
                  validate: (value) => {
                    const numero = value?.replace(/\D/g, '');
                    return (numero?.length === 8 || numero?.length === 9) || 'Número inválido';
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    label="Celular"
                    variant="outlined"
                    value={value ? formatPhone(value) : ''}
                    onChange={(e) => {
                      // Remove todos os não-dígitos e limita a 11 dígitos
                      const numbers = e.target.value.replace(/\D/g, '').substring(0, 11);
                      onChange(numbers);
                    }}
                    placeholder="99999-9999"
                    error={!!errors.celular?.numero}
                    helperText={errors.celular?.numero?.message}
                    disabled={isSubmitting}
                    fullWidth
                  />
                )}
              />
            </Box>

            <Controller
              name="cpf"
              control={control}
              rules={{
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: 'CPF inválido',
                },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  label="CPF"
                  variant="outlined"
                  value={value ? formatCPF(value) : ''}
                  onChange={(e) => {
                    const numbers = e.target.value.replace(/\D/g, '');
                    onChange(formatCPF(numbers));
                  }}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  disabled={isSubmitting}
                  fullWidth
                />
              )}
            />

            <Controller
              name="dataNascimento"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    {...field}
                    label="Data de Nascimento"
                    value={value}
                    onChange={(date) => onChange(date)}
                    maxDate={new Date()}
                    disabled={isSubmitting}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: !!errors.dataNascimento,
                        helperText: errors.dataNascimento?.message as string | undefined,
                      }
                    }}
                  />
                </LocalizationProvider>
              )}
            />
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
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VoluntarioFormDialog;
