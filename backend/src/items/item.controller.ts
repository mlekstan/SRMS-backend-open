import { Body, Controller, Post } from "@nestjs/common";
import { AddItemDto } from "./dto/add-item.dto";
import { ItemsService } from "./items.service";

 

@Controller("items")
export class ItemsController {
  constructor (private itemsService: ItemsService) {}

  @Post("add")
  add(@Body() addItemDto: AddItemDto) {
    return this.itemsService.add(addItemDto);
  }
}