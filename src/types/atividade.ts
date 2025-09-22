export interface Atividade {
  id: string;
  dataCriacao: string;
  nome: string;
  descricao?: string;
  ministerio: {
    id: string;
    nome: string;
  };
}

export interface AtividadeFiltros {
  nome?: string;
  limit?: number;
  cursor?: string;
}

export interface PagedResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
  totalCount: number;
}
