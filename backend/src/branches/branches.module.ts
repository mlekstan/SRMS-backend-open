import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branch } from "./branch.entity";
import { APP_FILTER } from "@nestjs/core";
import { QueryExceptionFilter } from "../exception-filters/query-exception.filter"
import { BranchesService } from "./branches.service";
import { BranchesController } from "./branches.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchesController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter
    },
    BranchesService
  ]
})
export class BranchesModule {}