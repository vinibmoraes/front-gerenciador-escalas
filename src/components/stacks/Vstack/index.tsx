import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface VStackProps extends BoxProps {
  children: ReactNode;
}

const VStack = ({ children, ...rest }: VStackProps) => {
  return (
    <Box display="flex" flexDirection="column" {...rest}>
      {children}
    </Box>
  );
};

export default VStack;
