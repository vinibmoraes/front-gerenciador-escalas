import React from "react";
import { Box, Typography } from "@mui/material";

const Inicio = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 200px)',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '5rem', mb: 2 }}>🚧</Typography>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Em Construção</Typography>
      <Typography variant="body1" color="text.secondary">
        Estamos trabalhando para trazer uma nova experiência para você. Volte em breve!
      </Typography>
    </Box>
  );
};

export default Inicio;
