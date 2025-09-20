import { Box, Alert, CircularProgress } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import BlueButton from "../../../../components/buttons/CustomButtonBlue";
import AuthButton from "../../../../components/buttons/CustomButtonAuth";
import RememberAndRecover from "../CustomRememberAndRecover";
import logoGoogleColorido from "../../../../assets/logo-google-colorido.png";
import AnimatedIcon from "../../../../components/animations/AnimatedIcon";
import VStack from "../../../../components/stacks/Vstack";
import HStack from "../../../../components/stacks/Hstack";
import CustomText from "../../../../components/texts/CustomText";
import CustomInputLogin from "../../../../components/inputs/CustomInputLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../../services/authService";

const LoginPrimaryLeft = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await authService.loginWithEmail(email, password);
      if (success) {
        navigate("/"); // Redirect to home/dashboard on success
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao tentar fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        bgcolor: "#fff",
        borderTopRightRadius: "2vh",
        borderBottomRightRadius: "2vh",
      }}
    >
      <VStack gap={2} alignItems="center" sx={{ flex: 1, padding: 2 }}>
        <CustomText
          text="Gerenciador de Escalas"
          size="responsiveTitle"
          color="#0F52BA"
        />
        <CustomText text="Login" size="responsiveText" color="#0F52BA" />

        <CustomInputLogin
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "40vh", maxWidth: "400px" }}
        />
        <CustomInputLogin
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "40vh", maxWidth: "400px" }}
        />

        <RememberAndRecover />

        {error && (
          <Alert severity="error" sx={{ width: "40vh", maxWidth: "400px" }}>
            {error}
          </Alert>
        )}

        <BlueButton
          text={isLoading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
          onClick={handleLogin}
          disabled={isLoading}
        />

        <VStack alignItems="center" gap={1}>
          <Box sx={{ width: "100%", maxWidth: 400, alignSelf: "flex-start" }}>
            <CustomText
              text="Acesse sua conta"
              size="small"
              color="#0F52BA"
              sx={{ paddingTop: "1.5vh" }}
            />
          </Box>

          <HStack
            sx={{
              width: "100%",
              justifyContent: "center",
              gap: "4vh",
            }}
          >
            <AuthButton
              icon={
                <AnimatedIcon icon={logoGoogleColorido} alt="Google logo" />
              }
              text="Google"
            />
            <AuthButton
              icon={<AnimatedIcon icon={<AppleIcon />} />}
              text="Apple"
            />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoginPrimaryLeft;
