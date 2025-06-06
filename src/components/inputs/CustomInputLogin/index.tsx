import React, { useState } from "react";
import {
  TextField,
  TextFieldProps,
  styled,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type CustomInputProps = {
  label: string;
  type?: string;
  endAdornment?: React.ReactNode;
} & TextFieldProps;

const CustomInputLogin = ({
  label,
  type = "text",
  endAdornment,
  ...props
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const passwordToggleIcon = (
    <IconButton
      sx={{ padding: "8px", "& svg": { fontSize: "18px" } }}
      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      onClick={() => setShowPassword((show) => !show)}
      edge="end"
      size="small"
    >
      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  );

  return (
    <Box sx={{ mb: "0.10vh", mt: "0.10vh" }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: "1.5vh",
          color: "#383838",
          marginBottom: "0.25vh",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        {label}
      </Typography>
      <StyledTextField
        variant="outlined"
        type={inputType}
        fullWidth
        InputProps={{
          endAdornment: isPassword ? (
            <InputAdornment position="end">{passwordToggleIcon}</InputAdornment>
          ) : endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
          style: {
            height: "5vh",
            paddingTop: "0.5vh",
            paddingBottom: "0.5vh",
            paddingRight: "1.5vh",
            paddingLeft: "0.5vh",
            width: "40vh",
          },
        }}
        {...props}
      />
    </Box>
  );
};

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: "#fff",
  borderRadius: "0.8vh",
  boxShadow: "0vh 0.3vh 0.6vh rgba(0, 0, 0, 0.1)",
  fontFamily: '"Poppins", sans-serif',
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.8vh",
    height: "5vh",
    "& input": {
      padding: "1.2vh",
      fontSize: "1.5vh",
    },
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#0F52BA",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0F52BA",
    },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 0vh #fff inset",
    WebkitTextFillColor: "#000",
    transition: "background-color 5000s ease-in-out 0s",
  },
}));

export default CustomInputLogin;
