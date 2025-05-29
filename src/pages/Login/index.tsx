import LoginContainer from "../../components/CusttomPageLogin/LoginContainer";
import { Box } from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginContainer />
    </Box>
  );
};

export default Login;
