import React from "react";
import { styled, keyframes } from "@mui/material/styles";

export interface AnimatedIconProps {
  icon: React.ReactNode | string;
  alt?: string;
  animate?: boolean;
}

const shake = keyframes`
  0% { transform: rotate(0deg) }
  25% { transform: rotate(-5deg) }
  50% { transform: rotate(5deg) }
  75% { transform: rotate(-5deg) }
  100% { transform: rotate(0deg) }
`;

const Wrapper = styled("span")<{ animate?: boolean }>(({ animate }) => ({
  display: "inline-flex",
  animation: animate ? `${shake} 0.5s ease-in-out infinite` : "none",
  "& img": {
    width: 24,
    height: 24,
  },
  "& svg": {
    width: 24,
    height: 24,
  },
}));

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon, alt, animate }) => {
  return (
    <Wrapper animate={animate}>
      {typeof icon === "string" ? <img src={icon} alt={alt} /> : icon}
    </Wrapper>
  );
};

export default AnimatedIcon;
