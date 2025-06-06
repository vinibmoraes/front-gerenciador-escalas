import { FormControlLabel, Checkbox, Typography, Link } from "@mui/material";
import { useState } from "react";
import RecoverPasswordModal from "../CustomRecoverPasswordModal";
import HStack from "../../../../components/stacks/Hstack";

const RememberAndRecover = () => {
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <HStack
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ width: "40%", maxWidth: "400px", mb: "1.5vh", mt: "-2vh" }}
    >
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{ color: "#383838", mt: "0.2vh" }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "1.5vh",
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
          fontSize: "1.5vh",
          color: "#383838",
          cursor: "pointer",
          textDecoration: "none",
          fontFamily: '"Poppins", sans-serif',
          position: "relative",
          padding: "0 0.4vh",
          "&:hover": {
            color: "#383838",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-0.3vh",
              left: 0,
              width: "100%",
              height: "0.3vh",
              backgroundColor: "#383838",
              transform: "scaleX(1)",
              transition: "transform 0.3s ease",
            },
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-0.3vh",
            left: 0,
            width: "100%",
            height: "0.3vh",
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
