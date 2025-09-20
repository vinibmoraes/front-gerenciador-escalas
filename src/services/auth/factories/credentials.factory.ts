import { AuthType } from "../../../interfaces/auth.interface";

type LocalCredentials = {
  email: string;
  password: string;
};

type OAuthCredentials = {
  token: string;
};

type CredentialsInput = LocalCredentials | OAuthCredentials;

type CredentialsOutput = {
  Email?: string;
  Senha?: string;
  TokenExterno?: string;
  AuthType: number;
};

type CredentialsFactory = {
  [key in AuthType]: (credentials: CredentialsInput) => CredentialsOutput;
};

export const credentialsFactory: CredentialsFactory = {
  local: (credentials) => {
    const { email, password } = credentials as LocalCredentials;
    return {
      Email: email,
      Senha: password,
      AuthType: 0,
    };
  },
  google: (credentials) => {
    const { token } = credentials as OAuthCredentials;
    return {
      TokenExterno: token,
      AuthType: 2,
    };
  },
  apple: (credentials) => {
    const { token } = credentials as OAuthCredentials;
    return {
      TokenExterno: token,
      AuthType: 1,
    };
  },
} as const;