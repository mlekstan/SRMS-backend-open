import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardsService } from "src/cards/cards.service";
import { RentalSale } from "./entities/rentalSale.entity";
import { Repository } from "typeorm";


@Injectable()
export class RentalSalesService {
  private rentalSaleRepository: Repository<RentalSale>; 

  constructor(
    @InjectRepository(RentalSale) rentalSaleRepository: Repository<RentalSale>, 
  ) {
    this.rentalSaleRepository = rentalSaleRepository;
  }

  async filterByCardId(id: number) {
    const rentalSale = await this.rentalSaleRepository.createQueryBuilder("rentalSale")
      .innerJoinAndSelect("rentalSale.rentalSalePositions", "rentalSalePosition")
      .innerJoinAndSelect("rentalSalePosition.subcategory", "subcategory")
      .leftJoin("rentalSalePosition.rentedItems", "rentedItem")
      .where("rentalSale.card = :cardId", { cardId: id})
      .andWhere("rentedItem.id IS NULL")
      .getMany();

    console.log(rentalSale)

    return rentalSale;
  }
}