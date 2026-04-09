/**
 * Environment configuration loader
 * Provides type-safe access to environment variables
 */

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appEnv: (import.meta.env.VITE_APP_ENV || 'development') as 'development' | 'production',
  appName: import.meta.env.VITE_APP_NAME || 'Ismoilov Online',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
} as const;

// Type for accessing env config
export type Config = typeof config;
