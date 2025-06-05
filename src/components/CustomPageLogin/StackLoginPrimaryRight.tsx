import { Box } from "@mui/material";
import Text from "../CustomTexts/TextPageLogin";
import WhiteButton from "../CustomButtons/ButtonDefaultWhite";
import VStack from "../CustomDirectionStack/VStack";
import logoNacoes from "../../assets/logo-nacoes-branco.png";

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
            height: "25vh",
            margin: 0,
            padding: 0,
          }}
        />

        <Text
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
