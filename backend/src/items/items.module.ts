import { Module } from "@nestjs/common";
import { ItemsController } from "./item.controller";
import { ItemsService } from "./items.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "../exception-filters/query-exception.filter";
import { RentedItem } from "../rentalSale/entities/rentedItem.entity";



@Module({
  imports: [TypeOrmModule.forFeature([Item, RentedItem])],
  controllers: [ItemsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    ItemsService
  ]
})
export class ItemsModule {}