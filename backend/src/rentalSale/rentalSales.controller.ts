import { Controller, Get, Query } from "@nestjs/common";
import { RentalSalesService } from "./rentalSales.service";
import { CardsService } from "../cards/cards.service";



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

}