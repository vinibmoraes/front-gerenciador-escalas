import { Box } from "@mui/material";
import WhiteButton from "../../../../components/buttons/CustomButtonWhite";
import VStack from "../../../../components/stacks/Vstack";
import logoNacoes from "../../../../assets/logo-nacoes-branco.png";
import CustomText from "../../../../components/texts/CustomText";

interface LoginPrimaryRightProps {
  onCreateAccount: () => void;
}

const LoginPrimaryRight = ({ onCreateAccount }: LoginPrimaryRightProps) => {
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
          text="Ainda não possui conta?"
          size="medium"
          color="#FFFFFF"
          sx={{
            margin: 0,
            padding: 0,
          }}
        />

        <WhiteButton text="Criar conta" onClick={onCreateAccount} />
      </VStack>
    </Box>
  );
};

export default LoginPrimaryRight;
