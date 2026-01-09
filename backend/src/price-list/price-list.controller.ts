import { Body, Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { PriceListService } from "./price-list.service";
import { AddPricesDto } from "./dto/add-prices.dto";


@Controller("price-list")
export class PriceListController {
  constructor(private priceListService: PriceListService) {}

  @Post()
  add(
    @Query("categoryId", ParseIntPipe) categoryId: number,
    @Query("subcategoryId", ParseIntPipe) subcategoryId: number, 
    @Body() addPricesDto: AddPricesDto 
  ) {
    return this.priceListService.add(categoryId, subcategoryId, addPricesDto);
  }

  @Get()
  findAll(
    @Query("categoryId", ParseIntPipe) categoryId: number,
    @Query("subcategoryId", ParseIntPipe) subcategoryId: number,
  ) {
    return this.priceListService.findAll(categoryId, subcategoryId);
  }
}
