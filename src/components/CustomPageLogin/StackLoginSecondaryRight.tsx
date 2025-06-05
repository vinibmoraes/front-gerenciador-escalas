import { Box } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import Text from "../CustomTexts/TextPageLogin";
import BlueButton from "../CustomButtons/ButtonDefaultBlue";
import AuthIconButton from "../CustomButtons/ButtonIcon";
import CustomInputLogin from "../CustomInputs/InputLogin";
import AnimatedIcon from "../Animations/AnimatedIcon";
import VStack from "../CustomDirectionStack/VStack";
import HStack from "../CustomDirectionStack/HStack";
import logoGoogleColorido from "../../assets/logo-google-colorido.png";

const StackLoginSecondaryRight = () => {
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
        <Text text="Criar conta" size="medium" color="#0F52BA" />

        <HStack
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <AuthIconButton
            icon={<AnimatedIcon icon={logoGoogleColorido} alt="Google logo" />}
          />
          <AuthIconButton icon={<AnimatedIcon icon={<AppleIcon />} />} />
        </HStack>

        <Box sx={{ width: "80%", textAlign: "left" }}>
          <Text
            sx={{ paddingTop: "1vh", paddingBottom: "0.5vh" }}
            text="Ou cadastre-se com seu e-mail"
            size="small"
            color="#0F52BA"
          />
        </Box>

        <CustomInputLogin label="Nome" type="text" />
        <CustomInputLogin label="E-mail" type="email" />
        <CustomInputLogin label="Senha" type="password" />

        <BlueButton text="Cadastrar" />
      </VStack>
    </Box>
  );
};

export default StackLoginSecondaryRight;
