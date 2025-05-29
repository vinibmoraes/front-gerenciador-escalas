import { Box, Paper } from "@mui/material";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

const LoginContainer = () => (
  <Paper
    sx={{
      width: "70%",
      maxWidth: "70%",
      height: "70%",
      maxHeight: "70%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      overflow: "hidden",
      bgcolor: "#00276d",
    }}
  >
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F52BA",

        height: "100%",
        overflow: "hidden",
      }}
    >
      <LoginLeft />
    </Box>

    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "grey.500",
        color: "#fff",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <LoginRight />
    </Box>
  </Paper>
);

export default LoginContainer;
