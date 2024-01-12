import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageInfo = await import('../package.json');

  const config = new DocumentBuilder()
  .setTitle(packageInfo.name)
  .setDescription(packageInfo.description)
  .setVersion(packageInfo.version)
  .addTag(packageInfo.keywords.reduce(i => i + ','))
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
