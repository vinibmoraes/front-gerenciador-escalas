import { Typography, TypographyProps } from "@mui/material";

type TextSize = "large" | "medium" | "small";

interface LoginTextProps extends TypographyProps {
  size?: TextSize;
  text: string;
}

const sizeStyles = {
  large: { fontSize: "5vh", fontWeight: 700 },
  medium: { fontSize: "2.5vh", fontWeight: 500 },
  small: { fontSize: "1vh", fontWeight: 400 },
};

const LoginText = ({ text, size = "medium", ...props }: LoginTextProps) => {
  return (
    <Typography
      fontFamily='"Poppins", sans-serif'
      {...sizeStyles[size]}
      {...props}
    >
      {text}
    </Typography>
  );
};

export default LoginText;
