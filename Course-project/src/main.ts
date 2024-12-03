import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'})

  // swagger
  const config = new DocumentBuilder()
      .setTitle('API Example')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('api')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port: number = parseInt(process.env.PORT, 10) || 3000;

  await app.listen(port);
  console.log('NEST is listening on port ' + port);
}
bootstrap();
