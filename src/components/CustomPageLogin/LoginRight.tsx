import { Stack, Typography, Box } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import SocialLoginButton from "../CustomButtonPageLogin";
import LoginText from "../CustomLoginText";
import BlueButton from "../CustomButtonBlue";
import CreateAccountButton from "../CustomButtonCreateAccount";
import CustomInputLogin from "../CustomInputLogin";
import RememberAndRecover from "../CustomRememberAndRecover";

const LoginRight = () => {
  return (
    <Stack spacing={3} alignItems="center">
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
          <LoginText
            text="Gerenciador de escalas"
            size="large"
            fontWeight="bold"
          />
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
        >
          <LoginText
            text="Acesse agora mesmo"
            size="medium"
            fontWeight="bold"
          />
        </Box>

        <CustomInputLogin label="E-mail" type="email" />
        <CustomInputLogin label="Senha" type="password" />
        <RememberAndRecover />

        <BlueButton text="Entrar" />

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

        <SocialLoginButton icon={<GoogleIcon />} text="Entrar com Google" />
        <SocialLoginButton icon={<AppleIcon />} text="Entrar com Apple" />

        {/* Botão Criar Conta */}
        <CreateAccountButton text="Criar conta Nações" />

        {/* Seção de login */}
        <Box
          sx={{
            mt: "1vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          {/* Container do texto alinhado à esquerda */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          ></Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginRight;
