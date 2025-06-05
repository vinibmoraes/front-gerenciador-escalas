import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import RightSlideAnimation from "../Animations/RightToLeftSlideAnimation";

type Props = {
  open: boolean;
  onClose: () => void;
};

const RecoverPasswordModal = ({ open, onClose }: Props) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    console.log("Enviando para:", email);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <RightSlideAnimation width={300}>
        <Box
          sx={{
            backgroundColor: "#383838",
            borderRadius: "8px",
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography fontWeight="bold" mb={1}>
            Recupere sua senha
          </Typography>
          <Typography variant="body2" mb={2}>
            Insira o e-mail cadastrado para receber uma nova senha.
          </Typography>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSend}>
            Enviar
          </Button>
        </Box>
      </RightSlideAnimation>
    </Modal>
  );
};

export default RecoverPasswordModal;
