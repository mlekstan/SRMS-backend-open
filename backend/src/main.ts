import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import fs from 'fs';
import { QueryExceptionFilter } from './exception-filters/query-exception.filter';

const httpsOptions = {
  key: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost-key.pem"),
  cert: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost.pem")
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });
  app.enableCors();
  app.useGlobalFilters(new QueryExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
