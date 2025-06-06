import { Box, BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RightSlideAnimationProps extends BoxProps {
  children: ReactNode;
}

const RightToLeftSlide = ({ children, ...props }: RightSlideAnimationProps) => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.5,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Box {...props} sx={{ width: "100%", height: "100%", ...props.sx }}>
        {children}
      </Box>
    </motion.div>
  );
};

export default RightToLeftSlide;
