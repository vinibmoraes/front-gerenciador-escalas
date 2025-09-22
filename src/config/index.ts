type Env = 'development' | 'staging' | 'production';

export interface AppConfig {
  api: {
    baseUrl: string;
    endpoints: {
      auth: string;
    };
  };
  env: Env;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
}

const ENV = (process.env.REACT_APP_ENV || 'development') as Env;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:50588/api';

export const config: AppConfig = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      auth: `${API_BASE_URL}/auth`,
    },
  },
  env: ENV,
  isDevelopment: ENV === 'development',
  isStaging: ENV === 'staging',
  isProduction: ENV === 'production',
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};

export default config;
