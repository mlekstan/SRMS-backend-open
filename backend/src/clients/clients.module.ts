import { Module } from "@nestjs/common";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Card } from "../cards/card.entity"
import { CardClient } from "./cardClient.entity";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "../exception-filters/query-exception.filter"


@Module({
  imports: [TypeOrmModule.forFeature([Client, Card, CardClient])],
  controllers: [ClientsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    ClientsService
  ]
})
export class ClientsModule {}