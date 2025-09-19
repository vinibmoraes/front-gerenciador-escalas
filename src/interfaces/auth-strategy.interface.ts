import { LoginResponse } from "./auth.interface";

export interface AuthStrategy {
  authenticate(credentials: any): Promise<LoginResponse>;
  getAuthType(): number;
}
