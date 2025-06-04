import { Box, Typography, IconButton } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import Text from "../CustomTexts/TextPageLogin";
import BlueButton from "../CustomButtons/ButtonDefaultBlue";
import AuthButton from "../CustomButtons/ButtonAuth";
import CustomInputLogin from "../CustomInputs/InputLogin";
import RememberAndRecover from "../CustomRememberAndRecover";
import logoGoogleColorido from "../../assets/logo-google-colorido.png";
import AnimatedIcon from "../Animations/AnimatedIcon";
import VStack from "../CustomDirectionStack/VStack";
import HStack from "../CustomDirectionStack/HStack";

const LoginRight = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "#fff",
        borderTopRightRadius: "2vh",
        borderBottomRightRadius: "2vh",
      }}
    >
      <VStack gap={2} alignItems="center" sx={{ width: "100%", maxWidth: 400 }}>
        <Text text="Gerenciador de Escalas" size="large" color="#0F52BA" />
        <Text text="Login" size="medium" color="#0F52BA" />

        <CustomInputLogin label="E-mail" type="email" />
        <CustomInputLogin label="Senha" type="password" />

        <RememberAndRecover />

        <BlueButton text="Entrar" />

        <Box sx={{ width: "80%", textAlign: "left" }}>
          <Text
            sx={{ paddingTop: "1vh", paddingBottom: "0.025vh" }}
            text="Acesse sua conta"
            size="small"
            color="#0F52BA"
          />
        </Box>

        <HStack
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "space-around",

            padding: "0px",
          }}
        >
          <AuthButton
            icon={<AnimatedIcon icon={logoGoogleColorido} alt="Google logo" />}
            text="Google"
          />
          <AuthButton
            icon={<AnimatedIcon icon={<AppleIcon />} />}
            text="Apple"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginRight;
