import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const BlueButton = ({
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
  backgroundColor: "#0F52BA",
  color: "#fff",
  borderRadius: "24px",
  padding: "12px",
  textTransform: "none",
  fontWeight: 550,
  fontSize: "16px",
  height: "5vh",
  width: "35vh",
  "&:hover": {
    backgroundColor: "#003b8e",
  },
});

export default BlueButton;
