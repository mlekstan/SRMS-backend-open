import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subcategory } from "./subcategory.entity";
import { Vehicle } from "./vehicle.entity";
import { DriveType } from "src/driveTypes/driveType.entity";
import { ElectricVehicle } from "./electricVehicle.entity";
import { SubcategoriesController } from "./subcategories.controller";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";
import { SubcategoriesService } from "./subcategories.service";


@Module({
  imports: [TypeOrmModule.forFeature([Subcategory, Vehicle, DriveType, ElectricVehicle])],
  controllers: [SubcategoriesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    SubcategoriesService
  ]
})
export class SubcategoriesModule {}