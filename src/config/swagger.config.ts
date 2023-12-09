import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const swaggerConfig = registerAs('swagger', () => ({
  url: process.env.SWAGGER_DOCUMENT_URL || 'docs',
}));

export const swaggerConfigValidation = {
  SWAGGER_DOCUMENT_URL: Joi.string().default('docs'),
};
