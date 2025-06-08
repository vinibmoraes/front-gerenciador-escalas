import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/LoginMain";
import Inicio from "../pages/Inicio/InicioMain";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
