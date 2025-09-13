import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // template de: https://github.com/marco0antonio0/template_nest_netlify
  let title_api = 'Template Nest Netlify';  
  let description_api = 'Documentação da API do Template Nest Netlify';
  let version_api = '1.0';
  // ============================================================
  //    Configurações do NestJS + Swagger + ValidationPipe
  // ============================================================
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); 
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,                     
    forbidNonWhitelisted: true,          
    transform: true,                      
    transformOptions: { enableImplicitConversion: true },
    validationError: { target: false, value: false },  
  }));
  const config = new DocumentBuilder()
    .setTitle(title_api)
    .setDescription(description_api)
    .setVersion(version_api)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();