import { Modal, Box } from "@mui/material";
import { useState } from "react";
import RightToLeftSlide from "../../../../components/animations/RightToLeftSlide";
import CustomText from "../../../../components/texts/CustomText";
import CustomButtonBlue from "../../../../components/buttons/CustomButtonBlue";
import VStack from "../../../../components/stacks/Vstack";
import CustomInputLogin from "../../../../components/inputs/CustomInputLogin"; // import do seu input customizado

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
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box onClick={onClose} sx={{ outline: "none" }}>
        <RightToLeftSlide>
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              p: 3,
              boxShadow: 24,
              width: 320,
              maxWidth: "90vw",
            }}
          >
            <VStack gap={2}>
              <CustomText
                text="Recupere sua senha"
                size="smallMedium"
                color="#0F52BA"
              />
              <CustomText
                text="Insira o e-mail cadastrado para receber uma nova senha."
                size="extraSmall"
                sx={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  color: "#383838",
                }}
              />

              <CustomInputLogin
                label="E-mail"
                type="email"
                sx={{ width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <CustomButtonBlue text="Cadastrar" onClick={handleSend} />
              </Box>
            </VStack>
          </Box>
        </RightToLeftSlide>
      </Box>
    </Modal>
  );
};

export default RecoverPasswordModal;
