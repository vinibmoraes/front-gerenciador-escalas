import { AuthStrategy } from "../../../../src/interfaces/auth-strategy.interface";
import { LoginResponse } from "../../../../src/interfaces/auth.interface";
import apiClient from "../../../../src/utils/api";

export class GoogleAuthStrategy implements AuthStrategy {
  async authenticate(credentials: { token: string; email: string }): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      Email: credentials.email,
      TokenExterno: credentials.token,
      AuthType: 2, // Google
    });
    return response;
  }

  getAuthType(): number {
    return 2; // Google auth type
  }
}
