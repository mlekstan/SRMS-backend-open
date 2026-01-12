import { Injectable } from "@nestjs/common";
import { IsNull, Not, Repository } from "typeorm";
import { Card } from "./card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardIface } from "./interfaces/card.interface";
import { copyToRow } from "../helper-functions/copyToRow";
import { CardClient } from "../clients/cardClient.entity";


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

  async updateOne(params: { id: string }, card: CardIface) {
    console.log(card, params)

    const cardRow = this.cardsRepository.create({
      id: Number(params.id),
      barcode: card.cardData.barcode,
    });

    return await this.cardsRepository.save(cardRow);
  }

  async findAll(issued: boolean) {
    if (issued === false) { 
      const unissuedCards = await this.cardsRepository
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

      return unissuedCards;
    }

    if (issued === true) {
      const issuedCards = await this.cardsRepository
        .createQueryBuilder("card")
        .innerJoin("card.cardClients", "card_client")
        .where("card_client.date_to IS NULL")
        .getMany();
      
      return issuedCards;
    }

    const allCards = this.cardsRepository.find();
    return allCards;
  }

  async findOne(params: { id: string }) {
    const card = await this.cardsRepository.findOneOrFail({
      where: {
        id: Number(params.id)
      }
    });

    return card;
  }

  async findOneByBarcode(params: { barcode: string }) {
    const card = await this.cardsRepository.findOneOrFail({
      where: {
        barcode: params.barcode
      }
    });

    return card;
  }
  
}