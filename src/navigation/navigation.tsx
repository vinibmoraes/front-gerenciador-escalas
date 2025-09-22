import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Login from "../pages/Login/LoginMain";
import Inicio from "../pages/Inicio/InicioMain";
import ConvitePage from "../pages/Convite";
import UsuariosPage from "../pages/Usuarios";
import Configuracoes from "../pages/Configuracoes";
import VoluntariosPage from "../pages/Voluntarios";
import MinisteriosPage from "../pages/Ministerios";
import { EditarMinisterio } from "../pages/Ministerios/EditarMinisterio";
import AtividadesPage from "../pages/Atividades";
import AtividadeFormDialog from "../components/atividades/AtividadeFormDialog";
import MainLayout from "../components/layout/MainLayout";
import { Atividade } from "../types/atividade";
import { atividadeService } from "../services/atividadeService";

const AppRoutes = () => (
  <MainLayout>
    <Routes>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/voluntarios" element={<VoluntariosPage />} />
      
      <Route path="/ministerios" element={<MinisteriosPage />} />
      <Route path="/ministerios/editar/:id" element={<EditarMinisterio />} />
      <Route path="/atividades" element={<AtividadesPage />} />
      <Route path="/atividades/novo" element={<AtividadeFormWrapper />} />
      <Route path="/atividades/editar/:id" element={<AtividadeFormWrapper isEdit />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/convite" element={<ConvitePage />} />
    </Routes>
  </MainLayout>
);

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios/convites/:conviteId" element={<ConvitePage />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

// Wrapper component to handle AtividadeFormDialog state and props
const AtividadeFormWrapper = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [atividade, setAtividade] = useState<Atividade | undefined>(undefined);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      const fetchAtividade = async () => {
        try {
          const data = await atividadeService.buscarPorId(id);
          setAtividade(data);
        } catch (error) {
          console.error('Erro ao carregar atividade:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAtividade();
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleClose = () => {
    navigate('/atividades');
  };

  const handleSuccess = () => {
    navigate('/atividades');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AtividadeFormDialog
      open={true}
      onClose={handleClose}
      onSuccess={handleSuccess}
      onError={(error) => console.error('Erro ao salvar atividade:', error)}
      atividade={atividade}
    />
  );
};

export default Navigation;
