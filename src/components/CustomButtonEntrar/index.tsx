import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const EntrarButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <StyledButton variant="outlined" fullWidth onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,
  fontSize: "16px",
  textAlign: "center",
  whiteSpace: "nowrap",
  textTransform: "none",

  // Cores e bordas
  backgroundColor: "#9EABB5",
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "24px",

  // Tamanho e espaçamento
  padding: "12px",
  height: "5vh",
  width: "35vh",

  // Efeitos visuais
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  // Layout
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "#9EABB5", // Mantém fundo branco
    color: "#fff", // Mantém texto azul
    border: "1px solid #fff", // Mantém borda
    transform: "translateY(-2px)", // Efeito de levantar
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Sombra mais pronunciada
  },

  "&:active": {
    transform: "translateY(0)", // Volta à posição normal quando clicado
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra mais suave
  },
});

export default EntrarButton;
