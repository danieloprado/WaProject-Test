export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();
export const SENTRY_DSN = (process.env.SENTRY_DSN || '').trim();

export const MONGO_DSN = (process.env.MONGO_DSN || 'mongodb://localhost:3003/ebay').trim();

export const BUILD_NUMBER = (process.env.BUILD_NUMBER || '').trim();
export const BUILD_DATE = (process.env.BUILD_DATE || '').trim();

export const IS_DEV = NODE_ENV === 'development';
export const IS_TEST = NODE_ENV === 'test';