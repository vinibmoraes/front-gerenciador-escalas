import { Box } from "@mui/material";
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

const LoginPrimaryLeft = () => {
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
      <VStack gap={2} alignItems="center" sx={{ flex: 1 }}>
        <CustomText
          text="Gerenciador de Escalas"
          size="responsiveTitle"
          color="#0F52BA"
        />
        <CustomText text="Login" size="responsiveText" color="#0F52BA" />

        <CustomInputLogin label="E-mail" type="email" />
        <CustomInputLogin label="Senha" type="password" />

        <RememberAndRecover />

        <BlueButton text="Entrar" />

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
