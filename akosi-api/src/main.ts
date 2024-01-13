import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration>);
  const apiConfig = configService.get('api', { infer: true });

  const packageInfo = await import('../package.json');

  const config = new DocumentBuilder()
    .setTitle(packageInfo.name)
    .setDescription(packageInfo.description)
    .setVersion(packageInfo.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(apiConfig.port);
}

bootstrap();
