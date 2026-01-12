import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RentalSale } from "./entities/rentalSale.entity";
import { Repository } from "typeorm";
import { RentalSalePosition } from "./entities/rentalSalePosition.entity";
import { RentedItem } from "./entities/rentedItem.entity";


@Injectable()
export class RentalSalesService {
  private rentalSaleRepository: Repository<RentalSale>; 
  private rentalSalePositionRepository: Repository<RentalSalePosition>;
  private rentedItemRepository: Repository<RentedItem>;

  constructor(
    @InjectRepository(RentalSale) rentalSaleRepository: Repository<RentalSale>, 
    @InjectRepository(RentalSalePosition) rentalSalePositionRepository: Repository<RentalSalePosition>, 
    @InjectRepository(RentedItem) rentedItemRepository: Repository<RentedItem>
  ) {
    this.rentalSaleRepository = rentalSaleRepository;
    this.rentalSalePositionRepository = rentalSalePositionRepository;
    this.rentedItemRepository = rentedItemRepository;
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

  async countFreeItems(subcategoryId: number, free: boolean, allItemsCount?: number) {

    const soldPositionsQuery = this.rentalSalePositionRepository.createQueryBuilder("rsp")
      .leftJoin("rsp.rentedItems", "ri")
      .where("ri.id IS NULL")
      .select("SUM(rsp.numberOfItems)", "sum");

    const rentedItemsCountQuery = this.rentedItemRepository.createQueryBuilder("ri")
      .innerJoin("ri.rentalSalePosition", "rsp")
      .where("ri.end IS NULL");

    if (subcategoryId) {
      soldPositionsQuery.andWhere("rsp.subcategory = :subcategoryId", { subcategoryId });
      rentedItemsCountQuery.andWhere("rsp.subcategory = :subcategoryId", { subcategoryId });
    }

    let soldItemsCount = await soldPositionsQuery.getRawOne();
    soldItemsCount = Number(soldItemsCount?.sum || 0);
    const rentedItemsCount = await rentedItemsCountQuery.getCount();

    let count = 0
    if (free === true && allItemsCount)
      count = allItemsCount - (soldItemsCount + rentedItemsCount);
    else 
      count = soldItemsCount + rentedItemsCount;

    return { count };
  }
}