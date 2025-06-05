import { useState } from "react";
import LoginPrimaryLeft from "./StackLoginPrimaryLeft";
import LoginPrimaryRight from "./StackLoginPrimaryRight";
import LoginSecondaryLeft from "./StackLoginSecondaryLeft";
import StackLoginSecondaryRight from "./StackLoginSecondaryRight";
import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import RightToLeftSlideAnimation from "../Animations/RightToLeftSlideAnimation";
import LeftToRightSlideAnimation from "../Animations/LeftToRightSlideAnimation";

const LoginAll = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleCreateAccount = () => setIsCreatingAccount(true);
  const handleBackToLogin = () => setIsCreatingAccount(false);
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
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {!isCreatingAccount ? (
              <RightToLeftSlideAnimation key="login">
                <LoginPrimaryLeft />
              </RightToLeftSlideAnimation>
            ) : (
              <RightToLeftSlideAnimation key="register">
                <LoginSecondaryLeft onBackToLogin={handleBackToLogin} />
              </RightToLeftSlideAnimation>
            )}
          </AnimatePresence>
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
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {!isCreatingAccount ? (
              <LeftToRightSlideAnimation key="login-right">
                <LoginPrimaryRight onCreateAccount={handleCreateAccount} />
              </LeftToRightSlideAnimation>
            ) : (
              <LeftToRightSlideAnimation key="register-right">
                <StackLoginSecondaryRight />
              </LeftToRightSlideAnimation>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAll;
