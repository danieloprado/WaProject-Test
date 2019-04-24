export const NODE_ENV = (process.env.NODE_ENV || 'production').trim();
export const SENTRY_DSN = (process.env.SENTRY_DSN || '').trim();

export const SITE_DSN = (process.env.SITE_DSN || 'localhost:3000//').trim();

export const MONGO_DSN = (process.env.MONGO_DSN || 'mongodb://localhost:3003/ebay').trim();

export const BUILD_NUMBER = (process.env.BUILD_NUMBER || '').trim();
export const BUILD_DATE = (process.env.BUILD_DATE || '').trim();

export const EBAY_KEY = (process.env.EBAY_KEY || 'DanielPr-E-PRD-af2fb35bc-c4a44b17').trim();
export const EBAY_ORDER_BY = (process.env.EBAY_ORDER_BY || 'PricePlusShippingLowest').trim();
export const EBAY_NUMBER_OF_ITEMS = Number((process.env.EBAY_NUMBER_OF_ITEMS || '').trim()) || 3;

export const MAIL = {
  enabled: !!process.env.MAILGUN_APIKEY,
  from: process.env.MAILGUN_FROM,
  credentials: {
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

export const IS_DEV = NODE_ENV === 'development';
export const IS_PROD = NODE_ENV !== 'development';
export const IS_TEST = NODE_ENV === 'test';