import { Box } from "@mui/material";
import LoginLeft from "../Login/LoginLeft";
import LoginRight from "../Login/LoginRight";

const LoginContainer = () => (
  <Box
    sx={{
      display: "flex",
      minHeight: "100vh",
      width: "100%",
    }}
  >
    <LoginLeft />
    <LoginRight />
  </Box>
);

export default LoginContainer;
