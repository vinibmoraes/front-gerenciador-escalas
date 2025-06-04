import LoginLeft from "../../components/CustomPageLogin/StackLoginLeft";
import LoginRight from "../../components/CustomPageLogin/StackLoginRight";
import HStack from "../CustomDirectionStack/HStack";
import { Box } from "@mui/material";

const LoginAll = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0F52BA",
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            minWidth: "50%",
          }}
        >
          <LoginLeft />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            minWidth: "50%",
          }}
        >
          <LoginRight />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAll;
