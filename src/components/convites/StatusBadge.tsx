import React from 'react';
import { Chip } from '@mui/material';
import { EConviteStatus } from '../../interfaces/convite.interface';

interface StatusBadgeProps {
  status: EConviteStatus;
}

const statusConfig: { [key in EConviteStatus]: { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' } } = {
  [EConviteStatus.Pendente]: { label: 'Pendente', color: 'warning' },
  [EConviteStatus.Aceito]: { label: 'Aceito', color: 'success' },
  [EConviteStatus.Recusado]: { label: 'Recusado', color: 'error' },
  [EConviteStatus.Expirado]: { label: 'Expirado', color: 'secondary' },
  [EConviteStatus.Cancelado]: { label: 'Cancelado', color: 'default' },
  [EConviteStatus.Erro]: { label: 'Erro', color: 'error' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || statusConfig[EConviteStatus.Erro];

  return <Chip label={config.label} color={config.color} variant="outlined" />;
};

export default StatusBadge;
