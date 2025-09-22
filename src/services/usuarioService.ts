import apiClient from '../utils/api';

export interface Usuario {
  id: string;
  dataCriacao: string;
  nome: string;
  email: string;
}

export interface PagedUsersResponse {
  total: number;
  items: Usuario[];
  hasNext: boolean;
  cursor: string | null;
}

export interface InviteUsuarioRequest {
  Nome: string;
  EmailAddress: string;
  MinisteriosIds: string[];
}

export interface InviteUsuarioResponse {
  link: string;
}

class UsuarioService {
  async getUsuarios(limit: number = 10, cursor?: string | null, nome?: string): Promise<PagedUsersResponse> {
    const params = new URLSearchParams();
    params.append('limit', String(limit));
    if (cursor) {
      params.append('cursor', cursor);
    }
    if (nome) {
      params.append('nome', nome);
    }

    const response = await apiClient.get<any>(`v1/usuarios?${params.toString()}`);
    
    return {
      total: response.total,
      items: response.items.map((item: any) => ({ 
        id: item.id, 
        dataCriacao: item.dataCriacao, 
        nome: item.nome, 
        email: item.email 
      })),
      hasNext: response.hasNext,
      cursor: response.cursor,
    };
  }

  async inviteUsuario(data: InviteUsuarioRequest): Promise<InviteUsuarioResponse> {
    const response = await apiClient.post<InviteUsuarioResponse>('v1/usuarios/convites', data);
    return response;
  }
}

export const usuarioService = new UsuarioService();

