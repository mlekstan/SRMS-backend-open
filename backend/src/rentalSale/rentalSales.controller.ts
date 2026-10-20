import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { RentalSalesService } from "./rentalSales.service";
import { CardsService } from "../cards/cards.service";
import { AddRentalSaleDto } from "./dto/add-rentalSale.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AddRentedItems } from "./dto/add-rentedItems.dto";
import { ReturnRentedItemDto } from "./dto/returnRentedItem.dto";
import { Card } from "src/cards/card.entity";



@Controller("rentalSales")
export class RentalSalesController {
  constructor(
    private rentalSalesService: RentalSalesService,
    private cardsService: CardsService,
  ) {}

  @Get()
  async filterByCardBarcode(@Query("barcode") barcode: string) {
    let card: Card;
    try {
      card = await this.cardsService.findOneByBarcode({ barcode });
    } catch (error) {
      throw new NotFoundException("There is no such card");
    }

    return this.rentalSalesService.filterByCardId(card.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  add(@Body() addRentalSaleDto: AddRentalSaleDto, @Req() req) {
    return this.rentalSalesService.add(addRentalSaleDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("rentedItems")
  addRentedItems(@Body() addRentedItemsDto: AddRentedItems, @Req() req) {
    return this.rentalSalesService.addRentedItems(addRentedItemsDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("rentedItems/return")
  returnRentedItem(@Body() returnRentedItemDto: ReturnRentedItemDto, @Req() req) {
    return this.rentalSalesService.returnRentedItem(returnRentedItemDto, req.user.id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("rentedItems/return/:barcode")
  getRentedItemInfo(@Param("barcode") barcode: string) {
    return this.rentalSalesService.getRentedItemInfo(barcode);
  }
}