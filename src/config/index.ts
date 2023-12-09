import * as Joi from 'joi';
import { appConfig, appConfigValidation } from './app.config';
import { databaseConfig, databaseConfigValidation } from './database.config';
import { swaggerConfig, swaggerConfigValidation } from './swagger.config';

const configValidation = Joi.object({
  ...appConfigValidation,
  ...databaseConfigValidation,
  ...swaggerConfigValidation,
});

export { appConfig, configValidation, databaseConfig, swaggerConfig };
