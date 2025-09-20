import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/LoginMain";
import Inicio from "../pages/Inicio/InicioMain";
import ConvitePage from "../pages/Convite";
import UsuariosPage from "../pages/Usuarios";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/usuarios/convites/:conviteId" element={<ConvitePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
