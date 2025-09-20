import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, CircularProgress, TextField, Button, Alert } from '@mui/material';
import StatusBadge from './StatusBadge';
import { RecuperarUsuarioConvitePorTokenResponse } from '../../interfaces/convite.interface';
import { conviteService } from '../../services/conviteService';
import { useNavigate } from 'react-router-dom';

interface InvitationCardProps {
  invitation: RecuperarUsuarioConvitePorTokenResponse | null;
  isLoading: boolean;
  error: string | null;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ invitation, isLoading, error }) => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [ddd, setDdd] = useState('');
  const [numero, setNumero] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAccept = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      setSubmitError('As senhas não conferem.');
      return;
    }
    if (!invitation) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await conviteService.aceitarConvite(invitation.id, {
        senha,
        authType: 0, // Local
        celular: { ddd, numero },
        tokenExterno: null,
      });
      alert('Convite aceito com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');
    } catch (err: any) {
      setSubmitError(err.message || 'Ocorreu um erro ao aceitar o convite.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!invitation) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await conviteService.recusarConvite(invitation.id);
      alert('Convite recusado com sucesso.');
      navigate('/'); // Redireciona para a página inicial
    } catch (err: any) {
      setSubmitError(err.message || 'Ocorreu um erro ao recusar o convite.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Card sx={{ minWidth: 275, maxWidth: 600, margin: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" color="error" gutterBottom>
            Erro ao Carregar Convite
          </Typography>
          <Typography variant="body1">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!invitation) {
    return null;
  }

  const isPendente = invitation.status === 0;

  return (
    <Card sx={{ minWidth: 275, maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
          Convite para {invitation.nome}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Status do Convite:
          </Typography>
          <StatusBadge status={invitation.status} />
        </Box>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Enviado por:</strong> {invitation.nomeEnviadoPor}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Email:</strong> {invitation.email}
        </Typography>

        {isPendente && (
          <Box component="form" onSubmit={handleAccept} noValidate sx={{ mt: 3 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Crie sua conta para aceitar
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="new-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <TextField
                required
                fullWidth
                name="confirmarSenha"
                label="Confirmar Senha"
                type="password"
                id="confirmarSenha"
                autoComplete="new-password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                error={senha !== confirmarSenha}
                helperText={senha !== confirmarSenha ? 'As senhas não conferem' : ''}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="ddd"
                  label="DDD"
                  id="ddd"
                  value={ddd}
                  onChange={(e) => setDdd(e.target.value)}
                  sx={{ width: '33.33%' }}
                />
                <TextField
                  required
                  fullWidth
                  name="numero"
                  label="Número Celular"
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  sx={{ width: '66.67%' }}
                />
              </Box>
            </Box>

            {submitError && (
              <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDecline}
                disabled={isSubmitting}
              >
                Recusar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || senha !== confirmarSenha || !senha}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Aceitar Convite'}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
