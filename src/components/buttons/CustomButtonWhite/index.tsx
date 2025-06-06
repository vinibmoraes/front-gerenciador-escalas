import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButtonWhite = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <StyledButton variant="contained" fullWidth onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,
  fontSize: "1.75vh",
  textAlign: "center",
  whiteSpace: "nowrap",
  textTransform: "none",

  backgroundColor: "#fff",
  color: "#0F52BA",
  borderRadius: "6px",
  border: "none",

  padding: "12px",
  height: "5vh",
  width: "40vh",

  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "#fff",
    color: "#0F52BA",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

export default CustomButtonWhite;
