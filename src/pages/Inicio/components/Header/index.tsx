import { Box, IconButton, Avatar } from "@mui/material";
import { HeaderButton } from "../HeaderButton";
import LogoNacoesPreto from "../../../../assets/logo-nacoes-preto.png";
import PersonIcon from "@mui/icons-material/Person";

export const Header: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="70px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="white"
      zIndex={1000}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        columnGap={5}
      >
        {/* Logo da igreja (substitui ícone da casinha) */}
        <Box
          component="img"
          src={LogoNacoesPreto}
          alt="Logo Nações"
          height="40px"
        />

        {/* Botões com fundo azul */}
        <Box
          bgcolor="#0d47a1"
          borderRadius="32px"
          px={2}
          py={1}
          display="flex"
          alignItems="center"
        >
          <HeaderButton label="Home" path="/home" />
          <HeaderButton label="Voluntários" path="/voluntarios" />
          <HeaderButton label="Escalas" path="/escalas" />
          <HeaderButton label="Ministérios" path="/ministerios" />
        </Box>

        {/* Avatar com nome do usuário */}
        <Box display="flex" alignItems="center" columnGap={1}>
          <IconButton>
            <Avatar sx={{ bgcolor: "#0d47a1", width: 36, height: 36 }}>
              <PersonIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Avatar>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
