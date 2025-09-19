import { AuthStrategy } from "../../../../src/interfaces/auth-strategy.interface";
import { LoginResponse } from "../../../../src/interfaces/auth.interface";
import apiClient from "../../../../src/utils/api";

export class AppleAuthStrategy implements AuthStrategy {
  async authenticate(credentials: { token: string; email: string }): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      Email: credentials.email,
      TokenExterno: credentials.token,
      AuthType: 1, // Apple
    });
    return response;
  }

  getAuthType(): number {
    return 1; // Apple auth type
  }
}
