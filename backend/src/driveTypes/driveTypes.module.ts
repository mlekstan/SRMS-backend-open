import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriveType } from "./driveType.entity";
import { DriveTypesController } from "./driveTypes.controller";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";
import { DrvieTypesService } from "./driveTypes.service";


@Module({
  imports: [TypeOrmModule.forFeature([DriveType])],
  controllers: [DriveTypesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    DrvieTypesService
  ]
})
export class DriveTypesModule {}