import React, { useState, useEffect, ReactElement } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatedIconProps } from "../../animations/AnimatedIcon";

const CustomButtonAuth = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  const [hover, setHover] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (hover) {
      setAnimate(true);
      timeoutId = setTimeout(() => {
        setAnimate(false);
      }, 700);
    } else {
      setAnimate(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hover]);

  const iconWithAnimation = React.isValidElement(icon)
    ? React.cloneElement(icon as ReactElement<AnimatedIconProps>, {
        animate,
      })
    : icon;

  return (
    <StyledButton
      variant="outlined"
      fullWidth
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      startIcon={iconWithAnimation}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Nunito Sans", sans-serif',
  fontWeight: 550,
  fontSize: "1.75vh",
  letterSpacing: "0.03vh",
  textAlign: "left",
  whiteSpace: "nowrap",
  cursor: "pointer",
  backgroundColor: "#4d4d4d",
  color: "#fff",
  border: "0.11vh solid #333",
  borderRadius: "0.66vh",
  padding: "1.33vh 1.77vh",
  textTransform: "none",
  boxShadow: "0 0.44vh 0.66vh rgba(0, 0, 0, 0.1)",

  transition: "all 0.3s ease",
  height: "4.5vh",
  width: "18vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing(0.5),

  "&:hover": {
    backgroundColor: "#5a5a5a",
    transform: "translateY(-0.22vh)",
    boxShadow: "0 0.66vh 1.33vh rgba(0, 0, 0, 0.2)",
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 0.22vh 0.44vh rgba(0, 0, 0, 0.1)",
  },

  "& .MuiSvgIcon-root": {
    width: "2.66vh",
    height: "2.66vh",
    transition: "transform 0.3s ease",
  },
  "& img": {
    width: "2.66vh",
    height: "2.66vh",
  },
}));

export default CustomButtonAuth;
