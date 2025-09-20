import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { conviteService } from '../../services/conviteService';
import { RecuperarUsuarioConvitePorTokenResponse } from '../../interfaces/convite.interface';
import InvitationCard from '../../components/convites/InvitationCard';

const ConvitePage: React.FC = () => {
  const { conviteId } = useParams<{ conviteId: string }>();
  const [invitation, setInvitation] = useState<RecuperarUsuarioConvitePorTokenResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conviteId) {
      setError('O ID do convite não foi encontrado na URL.');
      setIsLoading(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        setIsLoading(true);
        const data = await conviteService.recuperarConvitePorToken(conviteId);
        setInvitation(data);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitation();
  }, [conviteId]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Detalhes do Convite
        </Typography>
        <InvitationCard invitation={invitation} isLoading={isLoading} error={error} />
      </Box>
    </Container>
  );
};

export default ConvitePage;
