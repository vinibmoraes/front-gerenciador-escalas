import { UserProfile, AuthType } from "../interfaces/auth.interface";
import { AuthContext } from "./auth/auth-context";
import { LocalAuthStrategy } from "./auth/strategies/local.strategy";
import { GoogleAuthStrategy } from "./auth/strategies/google.strategy";
import { AppleAuthStrategy } from "./auth/strategies/apple.strategy";
import { credentialsFactory } from "./auth/factories/credentials.factory";
import apiClient from "../utils/api";


const AUTH_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

class AuthService {
  private authContext: AuthContext;

  constructor() {
    this.authContext = new AuthContext(new LocalAuthStrategy());
  }

  private setStrategy(authType: AuthType): void {
    switch (authType) {
      case 'google':
        this.authContext.setStrategy(new GoogleAuthStrategy());
        break;
      case 'apple':
        this.authContext.setStrategy(new AppleAuthStrategy());
        break;
      case 'local':
      default:
        this.authContext.setStrategy(new LocalAuthStrategy());
    }
  }

  public async authenticate(
    type: AuthType,
    credentials: { email?: string; password?: string; token?: string }
  ): Promise<boolean> {
    try {
      this.setStrategy(type);

      let factoryInput;

      if (type === 'local') {
        if (!credentials.email || !credentials.password) {
          throw new Error('Email and password are required for local login.');
        }
        factoryInput = {
          email: credentials.email,
          password: credentials.password,
        };
      } else {
        if (!credentials.token) {
          throw new Error('Token is required for OAuth login.');
        }
        factoryInput = {
          token: credentials.token,
        };
      }

      const authCredentials = credentialsFactory[type](factoryInput);

      const response = await this.authContext.authenticate(authCredentials);
      
      if (response?.authToken && response.refreshToken) {
        const { authToken, refreshToken } = response;
        this.setAuthData(authToken, refreshToken);
        return true;
      }
      
      throw new Error((response as any)?.Mensagem || "Erro no login");
    } catch (error) {
      console.error(`Erro ao fazer login com ${type}:`, error);
      throw error;
    }
  }

  public async loginWithGoogle(token: string): Promise<boolean> {
    return this.authenticate('google', { token });
  }

  public async loginWithApple(token: string): Promise<boolean> {
    return this.authenticate('apple', { token });
  }

  public async loginWithEmail(email: string, password: string): Promise<boolean> {
    return this.authenticate('local', { email, password });
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public setAuthData(authToken: string, refreshToken: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const authService = new AuthService();

export const getAuthToken = (): string | null => {
  return authService.getAuthToken();
};

export const getRefreshToken = (): string | null => {
  return authService.getRefreshToken();
};

export const setAuthData = (authToken: string, refreshToken: string): void => {
  authService.setAuthData(authToken, refreshToken);
};

export const clearAuthData = (): void => {
  authService.clearAuthData();
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const fetchUserProfile = async (): Promise<UserProfile | null> => {
  if (!isAuthenticated()) {
    return null;
  }

  try {
    return await apiClient.get<UserProfile>("/user/profile");
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};
