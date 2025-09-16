import { Module } from "@nestjs/common";
import { ItemsController } from "./item.controller";
import { ItemsService } from "./items.service";



@Module({
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}