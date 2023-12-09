import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE == 'true' ? true : false,
  sslEnabled: process.env.DATABASE_SSL_ENABLED == 'true' ? true : false,
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS),
  rejectUnauthorized:
    process.env.DATABASE_REJECT_UNAUTHORIZED == 'true' ? true : false,
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,
  logging: process.env.DATABASE_LOGGING == 'true' ? true : false,
}));

export const databaseConfigValidation = {
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_MAX_CONNECTIONS: Joi.number().default(100),
  DATABASE_SSL_ENABLED: Joi.boolean().default(false),
  DATABASE_REJECT_UNAUTHORIZED: Joi.boolean().default(false),
  DATABASE_CA: Joi.string().optional(),
  DATABASE_KEY: Joi.string().optional(),
  DATABASE_CERT: Joi.string().optional(),
  DATABASE_LOGGING: Joi.boolean().default(false),
};
