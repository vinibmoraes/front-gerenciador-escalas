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

const CustomInput = ({
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
          fontSize: "12px",
          color: "#383838",
          marginBottom: "2px",
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
            fontSize: "14px",
            height: "4.5vh",
            padding: "8px",
            width: "35vh",
          },
        }}
        {...props}
      />
    </Box>
  );
};

const StyledTextField = styled(TextField)(() => ({
  backgroundColor: "#fff",
  borderRadius: "6px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  fontFamily: '"Poppins", sans-serif',
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
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
    WebkitBoxShadow: "0 0 0 0px #fff inset",
    WebkitTextFillColor: "#000",
    transition: "background-color 5000s ease-in-out 0s",
  },
}));

export default CustomInput;
