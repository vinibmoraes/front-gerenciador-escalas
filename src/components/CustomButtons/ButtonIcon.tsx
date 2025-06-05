import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

const ButtonIcon = ({
  icon,
  onClick,
}: {
  icon: ReactNode;
  onClick?: () => void;
}) => {
  return <StyledButton onClick={onClick}>{icon}</StyledButton>;
};

const StyledButton = styled(Button)(() => ({
  minWidth: 0,
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  backgroundColor: "#000",
  color: "#fff",
  padding: 0,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "#000",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
}));

export default ButtonIcon;
