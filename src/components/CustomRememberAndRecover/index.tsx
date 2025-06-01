import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";
import RecoverPasswordModal from "../CustomRecoverPasswordModal";

const RememberAndRecover = () => {
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        mt: "1px",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{ color: "#fff" }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "14px",
              color: "#fff",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Permanecer conectado
          </Typography>
        }
      />
      <Link
        onClick={() => setOpenModal(true)}
        sx={{
          fontSize: "14px",
          color: "#fff",
          cursor: "pointer",
          textDecoration: "none",
          fontFamily: '"Poppins", sans-serif',
          position: "relative",
          padding: "0 2px",
          "&:hover": {
            color: "#fff",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#fff",
              transform: "scaleX(1)",
              transition: "transform 0.3s ease",
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: "100%",
            height: "2px",
            backgroundColor: "#fff",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease",
            transformOrigin: "right",
          },
        }}
      >
        Recuperar senha
      </Link>
      <RecoverPasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default RememberAndRecover;
