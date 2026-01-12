import { Body, Controller, Get, Param, ParseBoolPipe, Post, Put, Query } from "@nestjs/common";
import { AddCardDto } from "./dto/add-card.dto";
import { CardsService } from "./cards.service";


@Controller("cards")
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  add(@Body() addCardDto: AddCardDto) {
    return this.cardsService.add(addCardDto);
  }

  @Put(":id")
  updateOne(@Param() params: { id: string }, @Body() updateCardDto: AddCardDto) {
    return this.cardsService.updateOne(params, updateCardDto);
  }

  @Get()
  findAll(
    @Query("issued", ParseBoolPipe) issued: boolean) {
    console.log("iss", issued)
    return this.cardsService.findAll(issued);
  }

  @Get(":id")
  findOne(@Param() params: { id: string }) {
    return this.cardsService.findOne(params);
  }
}