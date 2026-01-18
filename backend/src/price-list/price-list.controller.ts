import { Body, Controller, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { PriceListService } from "./price-list.service";
import { AddPricesDto } from "./dto/add-prices.dto";
import { VehiclePriceListServcie } from "./vehicle-price-list.service";


@Controller("price-list")
export class PriceListController {
  constructor(
    private priceListService: PriceListService, 
    private vehiclePriceListService: VehiclePriceListServcie
  ) {}

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

  @Get("price")
  getPrice(
    @Query("categoryId", ParseIntPipe) categoryId: number, 
    @Query("subcategoryId", ParseIntPipe) subcategoryId: number, 
    @Query("speed") speed: string, 
    @Query("rentalLength") rentalLength: string, 
    @Query("numberOfItems", ParseIntPipe) numberOfItems: number
  ) {
    return this.priceListService.calculatePrice({
      categoryId, 
      subcategoryId, 
      speed: (speed === "null") ? null : Number(speed), 
      rentalLength, 
      numberOfItems
    });
  }

  @Get("speeds")
  findSpeeds(
    @Query("subcategoryId", ParseIntPipe) subcategoryId: number
  ) {
    return this.vehiclePriceListService.findSpeeds(subcategoryId);
  }
}
