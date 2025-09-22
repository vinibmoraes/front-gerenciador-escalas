import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  useTheme, 
  Stack, 
  Switch, 
  FormControlLabel,
  Divider,
  useMediaQuery
} from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Configuracoes = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          mb: 4,
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
        }}
      >
        Configurações
      </Typography>
      
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 2, sm: 3 },
          mb: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            mb: 2,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          Tema
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1" component="div">
              Modo {isDarkMode ? 'Escuro' : 'Claro'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {isDarkMode 
                ? 'Tema escuro ativado' 
                : 'Tema claro ativado'}
            </Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="primary"
                inputProps={{ 'aria-label': 'toggle theme' }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isDarkMode ? (
                  <DarkModeIcon sx={{ mr: 1 }} />
                ) : (
                  <LightModeIcon sx={{ mr: 1 }} />
                )}
                {isMobile ? null : (isDarkMode ? 'Escuro' : 'Claro')}
              </Box>
            }
            labelPlacement="start"
            sx={{ 
              m: 0,
              '& .MuiFormControlLabel-label': {
                minWidth: isMobile ? 0 : 60,
                display: 'flex',
                alignItems: 'center'
              }
            }}
          />
        </Stack>
      </Paper>
      
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            mb: 2,
            fontWeight: 500
          }}
        >
          Mais configurações
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" color="text.secondary">
          Mais opções de personalização estarão disponíveis em breve.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Configuracoes;
