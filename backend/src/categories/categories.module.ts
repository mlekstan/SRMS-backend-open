import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";


@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    CategoriesService
  ]
})
export class CategoriesModule {}