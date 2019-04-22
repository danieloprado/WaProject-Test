export const env = (process.env.NODE_ENV || 'development').trim();

export const isProduction = env === 'production';
export const isDevelopment = env === 'development';
export const isTest = env === 'test';