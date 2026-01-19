import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RentalSalesService } from "./rentalSales.service";
import { CardsService } from "../cards/cards.service";
import { AddRentalSaleDto } from "./dto/add-rentalSale.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AddRentedItems } from "./dto/add-rentedItems.dto";



@Controller("rentalSales")
export class RentalSalesController {
  constructor(
    private rentalSalesService: RentalSalesService,
    private cardsService: CardsService,
  ) {}

  @Get()
  async filterByCardBarcode(@Query("barcode") barcode: string) {
    const card = await this.cardsService.findOneByBarcode({ barcode });
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

}