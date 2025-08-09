// netlify/functions/nest.ts
import 'reflect-metadata';
import type { Handler } from '@netlify/functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
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

  // CORS (ajuste origins se precisar)
  app.enableCors();

  // ⚠️ Sem prefixo global para evitar /api/api com o redirect do Netlify
  // app.setGlobalPrefix('api');

  await app.init();
  cached = serverlessExpress({ app: expressApp });
  return cached;
}

export const handler: Handler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};
