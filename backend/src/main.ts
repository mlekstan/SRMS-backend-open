import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import fs from 'fs';
import { QueryExceptionFilter } from './exception-filters/query-exception.filter';
import express from "express";
import * as http from 'http';
import * as https from 'https';

const httpsOptions = {
  key: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost-key.pem"),
  cert: fs.readFileSync("e:\\Studia_Teleinformatyka_2022_2023\\Praca_inżynierska\\Cert\\localhost.pem")
}

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.useGlobalFilters(new QueryExceptionFilter());
  await app.init();
  // await app.listen(process.env.PORT ?? 3000);

  const httpServer = http.createServer(server).listen(3001);
  const httpsServer = https.createServer(httpsOptions, server).listen(3000);
}

bootstrap();
