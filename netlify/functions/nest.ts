// netlify/functions/nest.ts
import 'reflect-metadata';
import type { Handler } from '@netlify/functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from '../../src/app.module';

let cached: ReturnType<typeof serverlessExpress> | undefined;

async function bootstrap() {
  if (cached) return cached;

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // Habilite se precisar de CORS
  app.enableCors();

  // Se você usa prefixo global, comente ou ajuste o redirect no netlify.toml
  app.setGlobalPrefix('api');

  await app.init();
  cached = serverlessExpress({ app: expressApp });
  return cached;
}

// Netlify Functions usam handler (aws-lambda compat)
export const handler: Handler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};
