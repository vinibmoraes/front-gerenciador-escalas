import { Atividade, AtividadeFiltros, PagedResponse } from '../types/atividade';
import apiClient from '../utils/api';

export const atividadeService = {
  async listar(filtros: AtividadeFiltros = {}): Promise<PagedResponse<Atividade>> {
    const params = new URLSearchParams();
    
    if (filtros.nome) params.append('nome', filtros.nome);
    if (filtros.limit) params.append('limit', filtros.limit.toString());
    if (filtros.cursor) params.append('cursor', filtros.cursor);

    return await apiClient.get<PagedResponse<Atividade>>(`/v1/ministerios/atividades?${params.toString()}`);
  },

  async buscarPorId(id: string): Promise<Atividade> {
    return await apiClient.get<Atividade>(`/v1/ministerios/atividades/${id}`);
  },

  async criar(data: Omit<Atividade, 'id' | 'dataCriacao'>): Promise<Atividade> {
    const { ministerio, ...activityData } = data;
    const response = await apiClient.post<Atividade>(`/v1/ministerios/${ministerio.id}/atividades`, {
      nome: activityData.nome,
      descricao: activityData.descricao || ''
    });
    
    // The API returns the full atividade object in the response
    return response;
  },

  async atualizar(id: string, data: Partial<Atividade>): Promise<Atividade> {
    return await apiClient.put<Atividade>(`/v1/ministerios/atividades/${id}`, data);
  },

  async excluir(id: string): Promise<void> {
    await apiClient.delete(`/v1/ministerios/atividades/${id}`);
  }
};
