import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Historial de Mascotas')
    .setDescription('API de historial de mascotas')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc);

  app.enableCors({
    origin: [
      "https://main.d28p0502xzwadt.amplifyapp.com/", // ⚠️ cambia con tu dominio Amplify
      "http://localhost:5173",             // útil en dev local
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });


  await app.listen(process.env.PORT || 3003);
}
bootstrap();
