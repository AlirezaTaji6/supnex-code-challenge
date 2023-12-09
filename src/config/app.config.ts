import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { Environments } from '../common/enums/environments.enum';

export const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT),
  apiPrefix: process.env.API_PREFIX,
}));

export const appConfigValidation = {
  NODE_ENV: Joi.string()
    .valid(Environments.DEVELOP, Environments.PRODUCTION)
    .default(Environments.DEVELOP),
  APP_PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
};
