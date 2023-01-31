/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Validation
  // app.useGlobalFilters(new ApiExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('SIKA APP API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  const environment = config.get('environment');
  const port = config.get('port');

  await app.listen(port, () => {
    Logger.log(' ');
    Logger.log(
      '🚀 Application is running on  http://localhost:' + config.get('port')
    );
    Logger.log(`Environment     : ${environment}`);
    Logger.log(' ');
    Logger.log(`Postgres Host   : ${config.get('postgresHost')}`);
    Logger.log(`Postgres Port   : ${config.get('postgresPort')}`);
    Logger.log(`Postgres DbName : ${config.get('postgresDatabaseName')}`);
  });
}

bootstrap();
