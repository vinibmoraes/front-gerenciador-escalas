import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SocialLoginButton = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <StyledButton
      variant="outlined"
      fullWidth
      onClick={onClick}
      startIcon={icon}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)({
  fontFamily: '"Nunito Sans", sans-serif',
  fontWeight: 550,
  fontSize: "16px",
  letterSpacing: "0.25px",
  textAlign: "center",
  whiteSpace: "nowrap",

  textOverflow: "ellipsis",
  verticalAlign: "top",
  direction: "ltr",
  WebkitFontSmoothing: "antialiased",
  WebkitTextSizeAdjust: "100%",
  WebkitUserSelect: "none",

  cursor: "pointer",
  flexGrow: 0,
  background: "linear-gradient(45deg, #ffffff 0%, #f5f5f5 100%)",
  color: "#000",
  border: "1px solid #e0e0e0",
  borderRadius: "24px",
  padding: "12px",
  textTransform: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
  height: "5vh",
  width: "35vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, #f5f5f5 0%, #e0e0e0 100%)",
    zIndex: -1,
    opacity: 0,
    transition: "opacity 0.5s ease",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",

    "&:before": {
      opacity: 1,
    },

    "& .MuiSvgIcon-root": {
      animation: "shake 0.5s",
    },
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  "& .MuiSvgIcon-root": {
    width: "24px",
    height: "24px",
    transition: "transform 0.3s ease",
  },

  "@keyframes shake": {
    "0%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(-5deg)" },
    "50%": { transform: "rotate(5deg)" },
    "75%": { transform: "rotate(-5deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
});

export default SocialLoginButton;
