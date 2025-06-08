// components/HeaderButton.tsx
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderButtonProps {
  label: string;
  path: string;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ label, path }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <Button
      onClick={() => navigate(path)}
      sx={{
        color: isActive ? "#0d47a1" : "white",
        backgroundColor: isActive ? "white" : "#0d47a1",
        borderRadius: "20px",
        textTransform: "none",
        fontWeight: 600,
        mx: 0.5,
        px: 2,
        py: 1,
        "&:hover": {
          backgroundColor: isActive ? "white" : "#1565c0",
        },
      }}
    >
      {label}
    </Button>
  );
};
