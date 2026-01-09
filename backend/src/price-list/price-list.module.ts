import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehiclePrice } from "./entities/vehicle-price.entity";
import { PriceListController } from "./price-list.controller";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";
import { PriceListService } from "./price-list.service";
import { VehiclePriceListServcie } from "./vehicle-price-list.service";


@Module({
  imports: [TypeOrmModule.forFeature([VehiclePrice])],
  controllers: [PriceListController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    PriceListService,
    VehiclePriceListServcie
  ]
})
export class PriceListModule {}