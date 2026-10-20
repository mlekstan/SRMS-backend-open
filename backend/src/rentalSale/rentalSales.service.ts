import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { RentalSale } from "./entities/rentalSale.entity";
import { DataSource, IsNull, Repository } from "typeorm";
import { RentalSalePosition } from "./entities/rentalSalePosition.entity";
import { RentedItem } from "./entities/rentedItem.entity";
import { RentalSaleIface } from "./interfaces/rentalSale.interface";
import { User } from "src/users/user.entity";
import { PriceListService } from "src/price-list/price-list.service";
import { RentedItemsIface } from "./interfaces/rentedItems.interface";
import { transformInterval } from "src/helper-functions/transformInterval";
import { ReturnRentedItemIface } from "./interfaces/returnRentedItem.interface";
import { Item } from "src/items/item.entity";
import { transformMinutesToInterval } from "src/helper-functions/transformMinutesToInterval";
import { VehiclePrice } from "src/price-list/entities/vehicle-price.entity";

@Injectable()
export class RentalSalesService { 
  private dataSource: DataSource;
  private rentalSaleRepository: Repository<RentalSale>; 
  private rentalSalePositionRepository: Repository<RentalSalePosition>;
  private rentedItemRepository: Repository<RentedItem>;
  private itemRepository: Repository<Item>;
  private priceListService: PriceListService;

  constructor(
    @InjectDataSource() dataSource: DataSource, 
    @InjectRepository(RentalSale) rentalSaleRepository: Repository<RentalSale>, 
    @InjectRepository(RentalSalePosition) rentalSalePositionRepository: Repository<RentalSalePosition>, 
    @InjectRepository(RentedItem) rentedItemRepository: Repository<RentedItem>, 
    @InjectRepository(Item) itemRepository: Repository<Item>, 
    priceListService: PriceListService
  ) { 
    this.dataSource = dataSource;
    this.rentalSaleRepository = rentalSaleRepository;
    this.rentalSalePositionRepository = rentalSalePositionRepository;
    this.rentedItemRepository = rentedItemRepository;
    this.itemRepository = itemRepository;
    this.priceListService = priceListService;
  }

  // async filterByCardId(id: number) {
  //   const rentalSales = await this.rentalSaleRepository.createQueryBuilder("rentalSale")
  //     .innerJoinAndSelect("rentalSale.rentalSalePositions", "rentalSalePosition")
  //     .leftJoin("rentalSalePosition.rentedItems", "rentedItem")
  //     .where("rentalSale.card = :cardId", { cardId: id })
  //     .andWhere("rentedItem.id IS NULL")
  //     .getMany();

  //   rentalSales.map(rs => {
  //     rs.rentalSalePositions = rs.rentalSalePositions.map(rsp => {
  //       this.rentalSalePositionRepository.createQueryBuilder("rsp")
  //         .leftJoinAndSelect("rsp.vehiclePrice", "vp")
  //         .leftJoinAndSelect("vp.vehicle", "v")
  //         .where("rsp.id = :id", { id: rsp.id })
  //         .getOne();

  //       return 
  //     });
  //   })

  //     .leftJoinAndSelect("rentalSalePosition.vehiclePrice", "vehiclePrice")
  //     .leftJoinAndSelect("vehiclePrice.vehicle", "vehicle")
      
      
  //     .getOne();

  //   console.log("RentalSales", rentalSales)
  //   console.log("Positions", rentalSales?.rentalSalePositions)

  //   return rentalSales;
  // }

  async filterByCardId(id: number) {
    // 1. Pobieramy wszystkie powiązane dane jednym zapytaniem SQL
    const rentalSales = await this.rentalSaleRepository.createQueryBuilder("rentalSale")
      .innerJoinAndSelect("rentalSale.rentalSalePositions", "rsp")
      .leftJoin("rsp.rentedItems", "rentedItem") // leftJoin bez Select, bo potrzebne tylko do WHERE
      .leftJoinAndSelect("rsp.vehiclePrice", "vehiclePrice")
      .leftJoinAndSelect("vehiclePrice.vehicle", "vehicle")
      .leftJoinAndSelect("vehicle.subcategory", "subcategory") // Wymagane dla Twojego typu wyjściowego
      .where("rentalSale.card = :cardId", { cardId: id })
      .andWhere("rentedItem.id IS NULL")
      .getMany();

    // 2. Mapujemy zwrócone encje na Twój docelowy format DTO
    const formattedResult = rentalSales.map(rs => {
      return {
        id: rs.id,
        // UWAGA: Upewnij się, że te nazwy (np. rs.saleDate) pokrywają się z polami Twojej encji RentalSale
        saleDate: rs.saleDate, 
        actionRequired: rs.actionRequired,
        chargePredicted: rs.chargePredicted,
        charge: rs.charge,
        surcharge: rs.surcharge,
        rentalSalePositions: rs.rentalSalePositions.map(rsp => {
          return {
            id: rsp.id,
            // UWAGA: Upewnij się, że te nazwy pokrywają się z polami encji RentalSalePosition
            numberOfItems: rsp.numberOfItems,
            rentalLength: rsp.rentalLength,
            charge: rsp.charge,
            surcharge: rsp.surcharge,
            subcategory: {
              // Zabezpieczamy się na wypadek brakujących powiązań (optional chaining)
              id: rsp.vehiclePrice?.vehicle?.subcategory?.id || 0,
              name: rsp.vehiclePrice?.vehicle?.subcategory?.name || "Brak",
            }
          };
        })
      };
    });

    console.log("Sformatowany wynik:", JSON.stringify(formattedResult, null, 2));

    return formattedResult;
  }

  async countFreeItems(subcategoryId: number, free: boolean, allItemsCount?: number) {

    const soldPositionsQuery = this.rentalSalePositionRepository.createQueryBuilder("rsp")
      .leftJoin("rsp.rentedItems", "ri")
      .leftJoin("rsp.vehiclePrice", "vp")
      .where("ri.id IS NULL")
      .select("SUM(rsp.numberOfItems)", "sum");

    const rentedItemsCountQuery = this.rentedItemRepository.createQueryBuilder("ri")
      .innerJoin("ri.rentalSalePosition", "rsp")
      .leftJoin("rsp.vehiclePrice", "vp")
      .where("ri.end IS NULL");

    if (subcategoryId) {
      soldPositionsQuery.andWhere("vp.vehicle = :subcategoryId", { subcategoryId });
      rentedItemsCountQuery.andWhere("vp.vehicle = :subcategoryId", { subcategoryId });
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

        const vehiclePriceRow = await manager.find(VehiclePrice, {
          where: {
            vehicle: { id: p.subcategoryId }, 
            maxSpeed: p.speed ?? IsNull()
          }, 
          order: {
            timeUnit: "ASC"
          }
        }).then((vp) => vp[0]);

        const rentalSalePositionRow = manager.create(RentalSalePosition, {
          numberOfItems: p.numberOfItems, 
          rentalLength: p.rentalLength,
          chargePredicted: String(price),  
          charge: String(charge), 
          surcharge: "0", 
          rentalSale: rentalSaleRow, 
          vehiclePrice: vehiclePriceRow
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

  async addRentedItems(rentedItems: RentedItemsIface, userId: string) {
    const { positions } = rentedItems;
    const start = new Date();

    const rentedItemsRows = await Promise.all(positions.map(async p => {
      const { rentalLength } = await this.rentalSalePositionRepository.findOneOrFail({
        where: {
          id: p.rentalSalePositionId
        }
      });
      const endPredicted = new Date(start.getTime() + (transformInterval(rentalLength) * 60 * 1000));

      const rentedItemRow = this.rentedItemRepository.create({
        start: start.toISOString(),
        endPredicted: endPredicted.toISOString(),
        rentalSalePosition: { id: p.rentalSalePositionId }, 
        startUser: { id: Number(userId) }, 
        item: { id: p.itemId }, 
      })

      return rentedItemRow;
    }));

    return await this.rentedItemRepository.save(rentedItemsRows);
  }

  async returnRentedItem(returnRentedItem: ReturnRentedItemIface, userId: string) {
    const { barcode } = returnRentedItem;
    const item = await this.itemRepository.findOneOrFail({
      where: {
        barcode
      }
    });

    let rentedItem = await this.rentedItemRepository.findOneOrFail({
      where: {
        item, 
        end: IsNull(), 
        endUser: IsNull()
      }
    });
    rentedItem = this.rentedItemRepository.create({
      id: rentedItem.id, 
      end: (new Date()).toISOString(), 
      endUser: { id: Number(userId) }
    });
    
    await this.rentedItemRepository.save(rentedItem);
    return await this.rentedItemRepository.findOne({
      relations: {
        item: true
      }, 
      where: {
        id: rentedItem.id
      }
    });
  }

  async getRentedItemInfo(barcode: string) {
    const item = await this.itemRepository.createQueryBuilder("item")
      .leftJoinAndSelect("item.subcategory", "subcategory")
      .leftJoinAndSelect("subcategory.category", "category")
      .where("item.barcode = :barcode", { barcode })
      .getOne();

    if (!item) {
      throw new NotFoundException("Item with such barcode does not exist");
    }

    const rentedItem = await this.rentedItemRepository.createQueryBuilder("rentedItem")
      .leftJoinAndSelect("rentedItem.rentalSalePosition", "rentalSalePosition")
      .leftJoinAndSelect("rentalSalePosition.vehiclePrice", "vehiclePrice")
      .where("rentedItem.item = :itemId", { itemId: item.id })
      .andWhere("rentedItem.end IS NULL")
      .andWhere("rentedItem.endUser IS NULL")
      .getOne();

    if (!rentedItem) {
      throw new NotFoundException("This item is free currently");
    }

    const now = (new Date()).getTime();
    const start = (new Date(rentedItem.start)).getTime();
    const end = (new Date(rentedItem.endPredicted)).getTime();
    
    const leftTime = end - now;
    const leftTimeMinutes = Math.floor(Math.abs(leftTime) / (1000 * 60));
    const leftTimePrefix = (leftTime > 0) ? "+" : "-";
    const leftTimeInterval = transformMinutesToInterval(leftTimeMinutes);

    const passedTime = now - start;
    const passedTimeMinutes = Math.floor(Math.abs(passedTime) / (1000 * 60));
    const passedTimeInterval = transformMinutesToInterval(passedTimeMinutes);

    const passedTimeCharge = await this.priceListService.calculateCharge({
      categoryId: item.subcategory.category.id, 
      subcategoryId: item.subcategory.id, 
      speed: rentedItem.rentalSalePosition.vehiclePrice.maxSpeed, 
      rentalLength: passedTimeInterval, 
      numberOfItems: 1, 
      discount: "0"
    });
    const surcharge = 
      passedTimeCharge.charge - (
        Number(rentedItem.rentalSalePosition.charge) / 
        rentedItem.rentalSalePosition.numberOfItems
      );
      
    const surchargePrefix = (surcharge > 0) ? "+" : "-";

    
    return {
      ...rentedItem, 
      item: item, 
      leftTime: leftTimePrefix + leftTimeInterval, 
      surcharge: surchargePrefix + Math.abs(surcharge)
    };
  }
}