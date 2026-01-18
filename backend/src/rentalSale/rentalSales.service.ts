import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { RentalSale } from "./entities/rentalSale.entity";
import { DataSource, Repository } from "typeorm";
import { RentalSalePosition } from "./entities/rentalSalePosition.entity";
import { RentedItem } from "./entities/rentedItem.entity";
import { RentalSaleIface } from "./interfaces/rentalSale.interface";
import { User } from "src/users/user.entity";
import { PriceListService } from "src/price-list/price-list.service";


@Injectable()
export class RentalSalesService { 
  private dataSource: DataSource;
  private rentalSaleRepository: Repository<RentalSale>; 
  private rentalSalePositionRepository: Repository<RentalSalePosition>;
  private rentedItemRepository: Repository<RentedItem>;
  private priceListService: PriceListService;

  constructor(
    @InjectDataSource() dataSource: DataSource, 
    @InjectRepository(RentalSale) rentalSaleRepository: Repository<RentalSale>, 
    @InjectRepository(RentalSalePosition) rentalSalePositionRepository: Repository<RentalSalePosition>, 
    @InjectRepository(RentedItem) rentedItemRepository: Repository<RentedItem>, 
    priceListService: PriceListService
  ) { 
    this.dataSource = dataSource;
    this.rentalSaleRepository = rentalSaleRepository;
    this.rentalSalePositionRepository = rentalSalePositionRepository;
    this.rentedItemRepository = rentedItemRepository;
    this.priceListService = priceListService;
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

  async add(rentalSale: RentalSaleIface, userId: string) {

    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOneOrFail(User, {
        relations: {
          branch: true
        }, 
        where: {
          id: Number(userId)
        }, 
        select: {
          branch: {
            id: true
          }
        }
      });

      console.log("user", user)

      let priceSum = 0;
      let chargeSum = 0;
      let rentalSaleRow = manager.create(RentalSale, {
        saleDate: new Date(),
        actionRequired: true,
        chargePredicted: String(priceSum),
        charge: String(chargeSum),
        surcharge: "0", 
        user: { id: Number(userId) }, 
        card: { id: rentalSale.cardId }, 
        branch: { id: user.branch.id }, 
      });

      rentalSaleRow = await manager.save(rentalSaleRow);
      
      const rentalSalePostionRows = await Promise.all(rentalSale.positions.map(async (p) => {
        const { price, charge } = await this.priceListService.calculateCharge({
          categoryId: rentalSale.categoryId, 
          subcategoryId: p.subcategoryId, 
          speed: p.speed, 
          rentalLength: p.rentalLength, 
          numberOfItems: p.numberOfItems, 
          discount: p.discount
        });

        const rentalSalePositionRow = manager.create(RentalSalePosition, {
          numberOfItems: p.numberOfItems, 
          rentalLength: p.rentalLength, 
          charge: String(charge), 
          surcharge: "0", 
          rentalSale: rentalSaleRow, 
          subcategory: { id: p.subcategoryId }
        });

        priceSum += price;
        chargeSum += charge;

        return rentalSalePositionRow;
      }));

      rentalSaleRow.chargePredicted = String(priceSum);
      rentalSaleRow.charge = String(chargeSum);

      return { 
        rentalSale: await manager.save(rentalSaleRow), 
        rentalSalePositions: await manager.save(rentalSalePostionRows)
      };

    });
  }
}