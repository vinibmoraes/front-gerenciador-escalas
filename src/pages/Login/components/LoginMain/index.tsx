import { useState } from "react";
import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import RightSlideAnimation from "../../../../components/animations/RightToLeftSlide";
import LoginPrimaryLeft from "../LoginPrimaryLeft";
import LeftSlideAnimation from "../../../../components/animations/LeftToRightSlide";
import LoginPrimaryRight from "../LoginPrimaryRight";
import StackLoginSecondaryRight from "../LoginSecondaryRight";
import LoginSecondaryLeft from "../LoginSecondaryLeft";

const LoginMain = () => {
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
              <RightSlideAnimation key="login">
                <LoginPrimaryLeft />
              </RightSlideAnimation>
            ) : (
              <RightSlideAnimation key="register">
                <LoginSecondaryLeft onBackToLogin={handleBackToLogin} />
              </RightSlideAnimation>
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
              <LeftSlideAnimation key="login-right">
                <LoginPrimaryRight onCreateAccount={handleCreateAccount} />
              </LeftSlideAnimation>
            ) : (
              <LeftSlideAnimation key="register-right">
                <StackLoginSecondaryRight />
              </LeftSlideAnimation>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginMain;
