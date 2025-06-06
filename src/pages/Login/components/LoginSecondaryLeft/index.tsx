import { Box } from "@mui/material";
import logoNacoes from "../../../../assets/logo-nacoes-branco.png";
import VStack from "../../../../components/stacks/Vstack";
import WhiteButton from "../../../../components/buttons/CustomButtonWhite";
import CustomText from "../../../../components/texts/CustomText";

interface StackLoginSecondaryRightProps {
  onBackToLogin: () => void;
}

const LoginSecondaryLeft = ({
  onBackToLogin,
}: StackLoginSecondaryRightProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F52BA",
        height: "100vh",
        width: "100%",
        padding: 0,
        margin: 0,
        overflow: "hidden",

        top: 0,
        left: 0,
      }}
    >
      <VStack
        gap={3}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          component="img"
          src={logoNacoes}
          alt="Logo Nações"
          sx={{
            width: "auto",
            height: "40vh",
            margin: 0,
            padding: 0,
          }}
        />

        <CustomText
          text="Já possui uma conta?"
          size="medium"
          color="#FFFFFF"
          sx={{
            margin: 0,
            padding: 0,
          }}
        />

        <WhiteButton text="Faça Login" onClick={onBackToLogin} />
      </VStack>
    </Box>
  );
};

export default LoginSecondaryLeft;
