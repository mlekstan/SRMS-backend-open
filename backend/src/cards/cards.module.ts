import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";


@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  exports: [CardsService],
  controllers: [CardsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    CardsService
  ],
})
export class CardsModule {}