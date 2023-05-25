import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
   const PORT = process.env.PORT || 8080;
   const app = await NestFactory.create(AppModule);

   app.setGlobalPrefix('/api');
   app.enableCors({
      origin: true,
      credentials: true,
   });

   await app.listen(PORT, () =>
      console.log(`Сервер запущен на`, PORT, 'порту.')
   );
};
start();
