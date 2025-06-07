import { Typography, TypographyProps, SxProps, Theme } from "@mui/material";

type TextSize =
  | "extraLarge"
  | "large"
  | "mediumLarge"
  | "medium"
  | "smallMedium"
  | "small"
  | "extraSmall"
  | "caption"
  | "overline"
  | "responsiveTitle"
  | "responsiveText";

interface LoginTextProps extends TypographyProps {
  size?: TextSize;
  text: string;
  color?: string;
}

const sizeStyles: Record<TextSize, SxProps<Theme>> = {
  extraLarge: { fontSize: "400%", fontWeight: 700 },
  large: { fontSize: "300%", fontWeight: 700 },
  mediumLarge: { fontSize: "225%", fontWeight: 600 },
  medium: { fontSize: "180%", fontWeight: 600 },
  smallMedium: { fontSize: "125%", fontWeight: 500 },
  small: { fontSize: "100%", fontWeight: 500 },
  extraSmall: { fontSize: "87.5%", fontWeight: 400 },
  caption: { fontSize: "75%", fontWeight: 400 },
  overline: {
    fontSize: "62.5%",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  responsiveTitle: { fontSize: "calc(1.5vw + 1.5vh)", fontWeight: 700 },
  responsiveText: { fontSize: "1.5vw", fontWeight: 600 },
};

const CustomText = ({
  text,
  size = "medium",
  color,
  sx,
  ...props
}: LoginTextProps) => {
  const mergedSx = {
    ...sizeStyles[size],
    ...(sx || {}),
  };

  return (
    <Typography
      fontFamily='"Poppins", sans-serif'
      sx={mergedSx}
      color={color}
      noWrap
      {...props}
    >
      {text}
    </Typography>
  );
};

export default CustomText;
