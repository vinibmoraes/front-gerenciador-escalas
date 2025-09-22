import apiClient from '../utils/api';
import { ETipoCor } from '../enums/ETipoCor';

export interface CorDto {
  valor: string;
  tipo: ETipoCor;
}

export interface CreateMinisterioDto {
  nome: string;
  descricao: string | null;
  cor: CorDto;
}

export interface AtividadeMinistério {
  id: string;
  nome: string;
}

export interface Ministerio {
  id: string;
  nome: string;
  descricao: string | null;
  cor: string;
  dataCriacao: string;
  atividades?: AtividadeMinistério[];
}

interface MinisterioApiResponse {
  id: string;
  nome: string;
  descricao: string | null;
  cor: CorDto;
  dataCriacao: string;
}

export interface AtividadeLookup {
  id: string;
  nome: string;
}

export interface PagedMinisteriosResponse {
  items: Ministerio[];
  total: number;
  hasNext: boolean;
  cursor?: string | null;
}

class MinisterioService {
  async getMinisterios(limit: number = 10, cursor?: string | null, nome?: string): Promise<PagedMinisteriosResponse> {
    const params = new URLSearchParams();
    params.append('limit', String(limit));
    if (cursor) {
      params.append('cursor', cursor);
    }
    if (nome) {
      params.append('nome', nome);
    }

    const response = await apiClient.get<any>(`v1/ministerios?${params.toString()}`);
    
    return {
      items: response.items.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        descricao: item.descricao,
        cor: item.cor?.valor || item.cor,
        dataCriacao: item.dataCriacao
      })),
      total: response.total,
      hasNext: response.hasNext,
      cursor: response.cursor,
    };
  }

  async getMinisteriosLookup(): Promise<Array<{id: string; nome: string;}>> {
    const response = await apiClient.get<any[]>('v1/ministerios/lookup');
    
    return response.map(item => ({
      id: item.id,
      nome: item.nome,
    }));
  }

  async getAtividadesLookup(): Promise<AtividadeLookup[]> {
    try {
      const response = await apiClient.get<AtividadeLookup[]>('v1/ministerios/atividades/lookup');
      return response || [];
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      return [];
    }
  }

  async getMinisterioById(id: string): Promise<Ministerio> {
    try {
      const response = await apiClient.get<MinisterioApiResponse>(`v1/ministerios/${id}`);
      
      if (!response) {
        throw new Error('Ministério não encontrado');
      }
      
      console.log('Resposta da API (getMinisterioById):', response);
      
      // A API retorna o objeto diretamente, não dentro de uma propriedade 'data'
      const ministerio = response;
      
      // A cor já vem como string no formato '#RRGGBB'
      const corValue = typeof ministerio.cor === 'string' 
        ? ministerio.cor 
        : ministerio.cor?.valor || '';
        
      const result: Ministerio = {
        id: ministerio.id,
        nome: ministerio.nome,
        descricao: ministerio.descricao || null,
        cor: corValue,
        dataCriacao: ministerio.dataCriacao
      };
      
      console.log('Ministério formatado:', result);
      return result;
    } catch (error) {
      console.error('Erro ao buscar ministério por ID:', error);
      throw error;
    }
  }

  async adicionarMinisterio(data: CreateMinisterioDto): Promise<Ministerio> {
    try {
      console.log('Enviando dados para a API:', JSON.stringify(data, null, 2));
      const response = await apiClient.post<MinisterioApiResponse>('v1/ministerios', data);
      console.log('Resposta da API recebida:', response);
      
      if (!response) {
        throw new Error('Resposta vazia da API');
      }
      
      const corValue = typeof response.cor === 'string' 
        ? response.cor 
        : response.cor?.valor || '';
        
      const result: Ministerio = {
        id: response.id,
        nome: response.nome,
        descricao: response.descricao,
        cor: corValue,
        dataCriacao: response.dataCriacao
      };
      
      console.log('Dados formatados:', result);
      return result;
    } catch (error) {
      console.error('Erro no serviço adicionarMinisterio:', error);
      throw error;
    }
  }

  async atualizarMinisterio(id: string, data: CreateMinisterioDto): Promise<Ministerio> {
    try {
      console.log(`Atualizando ministério ${id} com dados:`, JSON.stringify(data, null, 2));
      const response = await apiClient.put<MinisterioApiResponse>(`v1/ministerios/${id}`, data);
      console.log('Resposta da API de atualização:', response);
      
      if (!response) {
        throw new Error('Resposta vazia da API');
      }
      
      const corValue = typeof response.cor === 'string' 
        ? response.cor 
        : response.cor?.valor || '';
        
      const result: Ministerio = {
        id: response.id,
        nome: response.nome,
        descricao: response.descricao,
        cor: corValue,
        dataCriacao: response.dataCriacao
      };
      
      console.log('Dados formatados após atualização:', result);
      return result;
    } catch (error) {
      console.error('Erro no serviço atualizarMinisterio:', error);
      throw error;
    }
  }
}

export const ministerioService = new MinisterioService();
