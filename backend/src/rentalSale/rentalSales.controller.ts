import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { RentalSalesService } from "./rentalSales.service";
import { CardsService } from "../cards/cards.service";
import { AddRentalSaleDto } from "./dto/add-rentalSale.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";



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

}