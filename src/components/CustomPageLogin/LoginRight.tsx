import { Stack, Typography, Button, Box } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import SocialLoginButton from "../CustomButtonPageLogin";
import LoginText from "../CustomLoginText";
import BlueButton from "../CustomButtonBlue";

const LoginRight = () => {
  return (
    <Stack spacing={3} alignItems="center">
      <LoginText text="Gerencie suas escalas" size="large" fontWeight="bold" />

      <Box
        sx={{
          gap: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          <LoginText text="Inscreva-se agora" size="medium" fontWeight="bold" />
        </Box>

        <SocialLoginButton
          icon={<GoogleIcon />}
          text="Registrar-se com Google"
        />
        <SocialLoginButton icon={<AppleIcon />} text="Registrar-se com Apple" />

        {/* Divisor "OU" */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            my: "1vh",
          }}
        >
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }} />
          <Typography sx={{ mx: 2, color: "#f0000" }}>OU</Typography>
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e0e0e0" }} />
        </Box>

        {/* Botão Criar Conta */}
        <BlueButton text="Criar conta" />

        {/* Seção de login */}
        <Box
          sx={{
            mt: "1vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centraliza o conteúdo principal (incluindo o botão)
            width: "100%", // Garante que o container ocupe toda a largura
            gap: 1,
          }}
        >
          {/* Container do texto alinhado à esquerda */}
          <Box
            sx={{
              width: "100%", // Ocupa toda a largura
              display: "flex",
              justifyContent: "flex-start", // Alinha o texto à esquerda
            }}
          >
            <LoginText
              text="Já tem uma conta?"
              size="small"
              fontWeight="bold"
            />
          </Box>

          {/* Botão centralizado */}
          <BlueButton text="Entrar" />
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginRight;
