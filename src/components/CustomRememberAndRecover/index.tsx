import { FormControlLabel, Checkbox, Typography, Link } from "@mui/material";
import { useState } from "react";
import RecoverPasswordModal from "../CustomRecoverPasswordModal";
import HStack from "../CustomDirectionStack/HStack";

const RememberAndRecover = () => {
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      sx={{ width: "80%", maxWidth: "80%", mb: "1vh", mt: "-2vh" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{ color: "#383838" }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "12px",
              color: "#383838",

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
          fontSize: "12px",
          color: "#383838",
          cursor: "pointer",
          textDecoration: "none",
          fontFamily: '"Poppins", sans-serif',
          position: "relative",
          padding: "0 2px",
          "&:hover": {
            color: "#383838",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#383838",
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
    </HStack>
  );
};

export default RememberAndRecover;
