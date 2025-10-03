import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardIface } from "./interfaces/card.interface";
import { copyToRow } from "src/helper-functions/copyToRow";


@Injectable()
export class CardsService {
  private cardsRepository: Repository<Card>

  constructor( @InjectRepository(Card) cardsRepository: Repository<Card> ) {
    this.cardsRepository = cardsRepository;
  }

  async add(card: CardIface) {
    try {
      const cardRow = new Card();

      copyToRow(cardRow, card);
      this.cardsRepository.save(cardRow);

      return card;
    } 
    catch(error) {
      throw error;
    }
  }
}