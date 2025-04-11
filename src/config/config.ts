import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
// Load file .env tương ứng khi chạy local
const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

const getEnvVar = (key: string, defaultValue: string | number) => {
  const value = process.env[key];
  if (!value) {
    console.warn(`⚠️  Environment variable ${key} not found. Using default: ${defaultValue}`);
  }
  return value || defaultValue;
};
export const config = {
  env,
  port: getEnvVar('PORT', 3001),
  database: {
    host: getEnvVar('DB_HOST', '127.0.0.1'),
    port: getEnvVar('DB_PORT', '27017'),
    username: getEnvVar('DB_USERNAME', 'trungit'),
    password: getEnvVar('DB_PASSWORD', '123456'),
    database: getEnvVar('DB_DATABASE', 'shopVip'),
  },
  api: {}
}