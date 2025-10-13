import { Module } from "@nestjs/common";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { Card } from "src/cards/card.entity";
import { CardClient } from "./cardClient.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Client, Card, CardClient])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}