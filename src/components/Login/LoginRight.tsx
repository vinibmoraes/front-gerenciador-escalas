import { Box, Typography, Button, Stack } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";

const LoginRight = () => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
    }}
  >
    <Typography variant="h4" fontWeight="bold" mb={2}>
      Gerenciador de Escalas
    </Typography>
    <Typography variant="body1" mb={4}>
      Acesse abaixo com esses botões
    </Typography>

    <Stack spacing={2} width="100%" maxWidth="300px">
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        sx={{
          backgroundColor: "#DB4437",
          color: "#fff",
          "&:hover": { backgroundColor: "#c23321" },
        }}
        fullWidth
      >
        Entrar com Google
      </Button>

      <Button
        variant="contained"
        startIcon={<AppleIcon />}
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": { backgroundColor: "#333" },
        }}
        fullWidth
      >
        Entrar com Apple
      </Button>
    </Stack>
  </Box>
);

export default LoginRight;
