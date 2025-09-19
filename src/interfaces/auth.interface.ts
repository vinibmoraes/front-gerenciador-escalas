export type AuthType = 'local' | 'google' | 'apple';

export interface LoginCredentials {
  Email: string;
  Senha?: string | null;
  TokenExterno?: string;
  AuthType: number;
}

export interface LoginResponse {
  Sucesso: boolean;
  Dados?: {
    AuthToken: string;
    RefreshToken: string;
  };
  Mensagem?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}
