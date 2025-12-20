import { TypeOrmModule } from "@nestjs/typeorm";
import { RentalSale } from "./entities/rentalSale.entity";
import { RentalSalePosition } from "./entities/rentalSalePosition.entity";
import { RentedItem } from "./entities/rentedItem.entity";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";
import { Module } from "@nestjs/common";
import { RentalSalesController } from "./rentalSales.controller";
import { RentalSalesService } from "./rentalSales.service";
import { CardsModule } from "src/cards/cards.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([RentalSale, RentalSalePosition, RentedItem]),
    CardsModule  
  ],
  controllers: [RentalSalesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    RentalSalesService
  ]
})
export class RentalSalesModule {}