import { Box } from "@mui/material";
import logo from "../../assets/logo-nacoes-branco.png";

const LoginLeft = () => (
  <Box
    sx={{
      flex: 1,
      backgroundColor: "#00276d",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src={logo}
      alt="Logo da Igreja Nações"
      style={{ maxWidth: "80%", height: "auto" }}
    />
  </Box>
);

export default LoginLeft;
