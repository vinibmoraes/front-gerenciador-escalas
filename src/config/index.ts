// Environment types
type Env = 'development' | 'staging' | 'production';

// Configuration interface
export interface AppConfig {
  api: {
    baseUrl: string;
    endpoints: {
      auth: string;
      // Add more endpoints here as needed
    };
  };
  env: Env;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
}

// Get environment variables
const ENV = (process.env.REACT_APP_ENV || 'development') as Env;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:50588/api';

// Configuration object
export const config: AppConfig = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      auth: `${API_BASE_URL}/auth`,
      // Add more endpoints here as needed
    },
  },
  env: ENV,
  isDevelopment: ENV === 'development',
  isStaging: ENV === 'staging',
  isProduction: ENV === 'production',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}${endpoint}`;
};

// Export default for easier imports
export default config;
