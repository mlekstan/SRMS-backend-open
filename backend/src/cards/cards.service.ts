import { Injectable } from "@nestjs/common";
import { Card } from "./interfaces/card.interface";


@Injectable()
export class CardsService {
  private cards: Card[] = []

  add(card: Card) {
    this.cards.push(card);
    console.log("CardsBase:", this.cards);
    return card;
  }
}