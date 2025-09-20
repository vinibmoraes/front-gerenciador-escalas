import { AuthStrategy } from "../../../../src/interfaces/auth-strategy.interface";
import { LoginResponse } from "../../../../src/interfaces/auth.interface";
import apiClient from "../../../../src/utils/api";

export class LocalAuthStrategy implements AuthStrategy {
  async authenticate(credentials: { Email: string; Senha: string }): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("v1/auth/login", {
      Email: credentials.Email,
      Senha: credentials.Senha,
      AuthType: 0,
    });
    return response;
  }

  getAuthType(): number {
    return 0;
  }
}
