export enum EConviteStatus {
  Pendente = 0,
  Aceito = 1,
  Recusado = 2,
  Expirado = 3,
  Cancelado = 4,
  Erro = 5,
}

export interface RecuperarUsuarioConvitePorTokenResponse {
  id: string;
  nome: string;
  email: string;
  nomeEnviadoPor: string;
  status: EConviteStatus;
}

export interface CelularItemDto {
  ddd: string;
  numero: string;
}

export interface AceitarConviteRequest {
  tokenExterno: string | null;
  senha: string;
  authType: number;
  celular: CelularItemDto;
}
