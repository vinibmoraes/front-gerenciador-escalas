import { AuthStrategy } from "../../interfaces/auth-strategy.interface";
import { LoginResponse } from "../../interfaces/auth.interface";

export class AuthContext {
  private strategy: AuthStrategy;

  constructor(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: AuthStrategy): void {
    this.strategy = strategy;
  }

  public async authenticate(credentials: any): Promise<LoginResponse> {
    return this.strategy.authenticate(credentials);
  }

  public getAuthType(): number {
    return this.strategy.getAuthType();
  }
}
