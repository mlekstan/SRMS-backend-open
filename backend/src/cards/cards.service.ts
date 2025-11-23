import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardIface } from "./interfaces/card.interface";
import { copyToRow } from "src/helper-functions/copyToRow";
import { CardClient } from "src/clients/cardClient.entity";


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
      await this.cardsRepository.save(cardRow);

      return card;
    } 
    catch(error) {
      throw error;
    }
  }

  async findAll(query: any) {
    if (query.active !== undefined) { 
      const activeCards = await this.cardsRepository
        .createQueryBuilder("card")
        .where((qb) => {
          const subQuery = qb.subQuery()
            .select("1")
            .from(CardClient, "card_client")
            .where("card.id = card_client.card_id")
            .andWhere("card_client.date_to IS NULL")
            .getQuery();

          return `NOT EXISTS (${subQuery})`;
        })
        .getMany();

      return activeCards;
    }

    const allCards = this.cardsRepository.find();
    return allCards;
  }
}