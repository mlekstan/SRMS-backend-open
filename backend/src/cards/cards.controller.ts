import { Body, Controller, Post } from "@nestjs/common";
import { AddCardDto } from "./dto/add-card.dto";
import { CardsService } from "./cards.service";


@Controller("cards")
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post("add")
  add(@Body() addCardDto: AddCardDto) {
    return this.cardsService.add(addCardDto);
  }
}