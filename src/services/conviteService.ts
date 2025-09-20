import apiClient from "../utils/api";
import { AceitarConviteRequest, RecuperarUsuarioConvitePorTokenResponse } from "../interfaces/convite.interface";

class ConviteService {
  public async recuperarConvitePorToken(
    token: string
  ): Promise<RecuperarUsuarioConvitePorTokenResponse> {
    try {
      const response = await apiClient.get<RecuperarUsuarioConvitePorTokenResponse>(
        `/v1/usuarios-convites/token/${token}`
      );
      return response;
    } catch (error) {
      console.error("Falha ao recuperar o convite:", error);
      throw new Error("Não foi possível carregar os detalhes do convite. Verifique o link e tente novamente.");
    }
  }

  public async aceitarConvite(
    id: string,
    payload: AceitarConviteRequest
  ): Promise<void> {
    try {
      await apiClient.put(`/v1/usuarios-convites/${id}/aceitar`, payload);
    } catch (error) {
      console.error("Falha ao aceitar o convite:", error);
      throw new Error("Não foi possível aceitar o convite. Tente novamente mais tarde.");
    }
  }

  public async recusarConvite(id: string): Promise<void> {
    try {
      await apiClient.put(`/v1/usuarios-convites/${id}/recusar`);
    } catch (error) {
      console.error("Falha ao recusar o convite:", error);
      throw new Error("Não foi possível recusar o convite. Tente novamente mais tarde.");
    }
  }
}

export const conviteService = new ConviteService();
