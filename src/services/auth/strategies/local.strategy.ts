import { AuthStrategy } from "../../../../src/interfaces/auth-strategy.interface";
import { LoginResponse } from "../../../../src/interfaces/auth.interface";
import apiClient from "../../../../src/utils/api";

export class LocalAuthStrategy implements AuthStrategy {
  async authenticate(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      Email: credentials.email,
      Senha: credentials.password,
      AuthType: 0,
    });
    return response;
  }

  getAuthType(): number {
    return 0; // Local auth type
  }
}
