import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { QueryExceptionFilter } from "src/exception-filters/query-exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { UsersService } from "./users.service";


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter,
    },
    UsersService
  ]
})
export class UsersModule {}