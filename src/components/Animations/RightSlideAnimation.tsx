// components/RightSlideAnimation.tsx
import { Box, BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RightSlideAnimationProps extends BoxProps {
  children: ReactNode;
  width?: number | string;
}

const RightSlideAnimation = ({
  children,
  width = 300,
  ...props
}: RightSlideAnimationProps) => {
  return (
    <Box
      {...props}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        ...props.sx,
      }}
    >
      <motion.div
        initial={{ x: "100vw", opacity: 0 }} // Começa totalmente à direita
        animate={{ x: 0, opacity: 1 }} // Vem para a posição normal (centro)
        exit={{ x: "100vw", opacity: 0 }} // Sai para a direita
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default RightSlideAnimation;
