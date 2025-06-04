import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface HStackProps extends BoxProps {
  children: ReactNode;
}

const HStack = ({ children, ...rest }: HStackProps) => {
  return (
    <Box display="flex" flexDirection="row" {...rest}>
      {children}
    </Box>
  );
};

export default HStack;
