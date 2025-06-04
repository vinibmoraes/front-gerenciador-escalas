import { Typography, TypographyProps } from "@mui/material";

type TextSize = "large" | "medium" | "small";

interface LoginTextProps extends TypographyProps {
  size?: TextSize;
  text: string;
  color?: string;
}

const sizeStyles = {
  large: { fontSize: "4vh", fontWeight: 700 },
  medium: { fontSize: "3.5vh", fontWeight: 600 },
  small: { fontSize: "2vh", fontWeight: 500 },
};

const LoginText = ({
  text,
  size = "medium",
  color,
  ...props
}: LoginTextProps) => {
  return (
    <Typography
      fontFamily='"Poppins", sans-serif'
      {...sizeStyles[size]}
      color={color}
      noWrap
      {...props}
    >
      {text}
    </Typography>
  );
};

export default LoginText;
