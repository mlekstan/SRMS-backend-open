import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AddItemDto } from "./dto/add-item.dto";
import { ItemsService } from "./items.service";

 

@Controller("items")
export class ItemsController {
  constructor (private itemsService: ItemsService) {}

  @Post()
  add(@Body() addItemDto: AddItemDto) {
    return this.itemsService.add(addItemDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateItemDto: AddItemDto) {
    return this.itemsService.updateOne(params, updateItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.itemsService.findOne(params);
  }

  @Get("barcode/:barcode")
  findOneByBarcode(
    @Param() params: { barcode: string }, 
    @Query("subcategoryId") subcategoryId: string, 
    @Query("free") free: string
  ) {
    return this.itemsService.findOne(params, subcategoryId, free);
  }
}