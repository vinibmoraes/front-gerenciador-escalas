import {
  TextField,
  TextFieldProps,
  styled,
  Typography,
  Box,
} from "@mui/material";

type CustomInputProps = {
  label: string;
  type?: string;
} & TextFieldProps;

const CustomInput = ({ label, type = "text", ...props }: CustomInputProps) => {
  return (
    <Box sx={{ mb: "0.10vh", mt: "0.10vh" }}>
      <Typography
        variant="body2"
        sx={{
          fontSize: "12px",
          color: "#fff",
          marginBottom: "2px",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        {label}
      </Typography>
      <StyledTextField
        variant="outlined"
        type={type}
        fullWidth
        InputProps={{
          style: {
            fontSize: "14px",
            height: "4.5vh",
            padding: "2px",
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
  borderRadius: "24px",
  fontFamily: '"Poppins", sans-serif',
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px",
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
  // Corrige visual do autofill
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 0px #fff inset",
    WebkitTextFillColor: "#000",
    transition: "background-color 5000s ease-in-out 0s",
  },
}));

export default CustomInput;
