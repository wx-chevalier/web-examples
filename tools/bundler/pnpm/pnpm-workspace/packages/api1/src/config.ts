export const HOST = process.env.HOST || '127.0.0.1';
export const PORT = parseInt(process.env.PORT ? process.env.PORT : '5000') || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'oh so secret';
export const DB_URL = process.env.DB_URL || 'postgres://admin:Admin123@127.0.0.1:5432/monosample';

