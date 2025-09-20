import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Chip,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Usuario } from '../../services/usuarioService';

interface UserTableProps {
  users: Usuario[];
  loading: boolean;
}

const statusColors: { [key in Usuario['status']]: 'success' | 'warning' | 'default' } = {
  Ativo: 'success',
  Inativo: 'warning',
  Convidado: 'default',
};

const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontWeight="bold">Nome</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
            <TableCell align="right"><Typography fontWeight="bold">Ações</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.nome}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip label={user.status} color={statusColors[user.status]} size="small" />
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

