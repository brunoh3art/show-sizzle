// ENV VARIABLES
export const {
  NODE_ENV = 'development',
  APP_ENV = 'development',
  APP_SECRET = 'APP_SECRET',
  APOLLO_KEY = 'APOLLO_KEY',
  APP_AUTH_SECRET = 'APP_AUTH_SECRET',
  SENTRY_DSN = 'SENTRY_DSN',
  SENDGRID_API_KEY = 'SENDGRID_API_KEY',
  PORT = 5000,
  DATABASE_URL = '',
  WEB_URL = 'localhost:3001',
  REDIS_URL = '',
} = process.env;

//  JWT AUTH
export const JWT_AUTH = {
  secret: APP_AUTH_SECRET,
  credentialsRequired: false,
  algorithms: ['HS256'],
};
