import { Stack, Typography, Button } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import SocialLoginButton from "../CustomButtomPageLogin";
import LoginText from "../CustomLoginText";

const LoginRight = () => {
  return (
    <Stack spacing={3} alignItems="center">
      <LoginText text="Gerencie suas escalas" size="large" fontWeight="bold" />
      <LoginText text="Insecreva-se agora" size="medium" fontWeight="bold" />

      <SocialLoginButton icon={<GoogleIcon />} text="Registrar-se com Google" />

      <SocialLoginButton icon={<AppleIcon />} text="Registrar-se com Apple" />
    </Stack>
  );
};

export default LoginRight;
