import { Box } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import BlueButton from "../../../../components/buttons/CustomButtonBlue";
import AuthIconButton from "../../../../components/buttons/CustomButtonIcon";
import AnimatedIcon from "../../../../components/animations/AnimatedIcon";
import VStack from "../../../../components/stacks/Vstack";
import HStack from "../../../../components/stacks/Hstack";
import CustomText from "../../../../components/texts/CustomText";
import CustomInputLogin from "../../../../components/inputs/CustomInputLogin";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../../../services/authService";

const StackLoginSecondaryRight = () => {
  const handleGoogleLogin = async (credentialResponse: any) => {
    const accessToken = credentialResponse?.credential;
    if (accessToken) {
      const success = await loginWithGoogle(
        accessToken,
        "vinibmoraesgamer@gmail.com"
      );
      if (success) {
        console.log("Login com Google realizado com sucesso!");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "#fff",
        borderTopLeftRadius: "2vh",
        borderBottomLeftRadius: "2vh",
      }}
    >
      <VStack gap={2} alignItems="center" sx={{ width: "100%", maxWidth: 400 }}>
        <CustomText text="Criar conta" size="medium" color="#0F52BA" />

        <HStack
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.error("Erro ao autenticar com o Google");
            }}
          />
          <AuthIconButton icon={<AnimatedIcon icon={<AppleIcon />} />} />
        </HStack>

        <Box sx={{}}>
          <CustomText
            sx={{ paddingTop: "1vh", paddingBottom: "0.5vh" }}
            text="Ou cadastre-se com seu e-mail"
            size="smallMedium"
            color="#0F52BA"
          />
        </Box>

        <CustomInputLogin
          label="Nome"
          type="text"
          sx={{ width: "40vh", maxWidth: "400px" }}
        />
        <CustomInputLogin
          label="E-mail"
          type="email"
          sx={{ width: "40vh", maxWidth: "400px" }}
        />
        <CustomInputLogin
          label="Senha"
          type="password"
          sx={{ width: "40vh", maxWidth: "400px" }}
        />

        <Box sx={{ mt: "3vh" }}>
          <BlueButton text="Cadastrar" />
        </Box>
      </VStack>
    </Box>
  );
};

export default StackLoginSecondaryRight;
