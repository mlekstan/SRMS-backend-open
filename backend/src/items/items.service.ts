import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IsNull, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { ItemIface } from "./interfaces/items.interface";
import { RentedItem } from "../rentalSale/entities/rentedItem.entity";
import { RentalSalesService } from "src/rentalSale/rentalSales.service";



@Injectable()
export class ItemsService {
  private itemsRepository: Repository<Item>;
  private rentedItemsRepository: Repository<RentedItem>;
  private rentalSalesService: RentalSalesService;

  constructor(
    @InjectRepository(Item) itemsRepository: Repository<Item>,
    @InjectRepository(RentedItem) rentedItemsRepository: Repository<RentedItem>,
    rentalSalesService: RentalSalesService
  ) {
    this.itemsRepository = itemsRepository;
    this.rentedItemsRepository = rentedItemsRepository;
    this.rentalSalesService = rentalSalesService;
  }

  async add(item: ItemIface) {
    try {
      const { basicData, saleData } = item;

      const itemRow = this.itemsRepository.create({
        name: basicData.name,
        shortName: basicData.shortName,
        barcode: basicData.barcode,
        marketValue: basicData.marketValue,
        status: 0,
        
        subcategory: { id: basicData.subcategoryId },
        branch: { id: basicData.branchId },
        
        forSale: saleData.forSale,
        sellPrice: saleData.sellPrice
      });
      
      return await this.itemsRepository.save(itemRow)

    } catch (error) {
      throw error;
    }
    
  }

  async updateOne(params: { id: string }, item: ItemIface) {
    const { basicData, saleData } = item;

    const itemRow = this.itemsRepository.create({
      id: Number(params.id),
      name: basicData.name,
      shortName: basicData.shortName,
      barcode: basicData.barcode,
      marketValue: basicData.marketValue,
      subcategory: {
        id: basicData.subcategoryId,
      },
      branch: {
        id: basicData.branchId,
      },
      forSale: saleData.forSale,
      sellPrice: saleData.sellPrice
    });

    return await this.itemsRepository.save(itemRow);
  }

  async findAll() {
    const items = await this.itemsRepository.find({
      relations: {
        subcategory: true,
        branch: true,
      },
      select: {
        id: true,
        name: true,
        shortName: true,
        barcode: true,
        marketValue: true,
        forSale: true,
        sellPrice: true,
        subcategory: {
          id: true,
          name: true,
        },
        branch: {
          id: true,
          name: true,
        }
      }
    });

    return items;
  }

  async findOne(params: { id: string } | { barcode: string }, subcategoryId?: string, free?: string) {
    let where = {};
    if ("id" in params) {
      where = { id: Number(params.id) };
    }
    if ("barcode" in params) {
      where = { barcode: params.barcode };
    }

    const item = await this.itemsRepository.findOneOrFail({
      where: {
        ...where
      },
      relations: {
        subcategory: true,
        branch: true,
      },
      select: {
        id: true,
        name: true,
        shortName: true,
        barcode: true,
        marketValue: true,
        forSale: true,
        sellPrice: true,
        subcategory: {
          id: true,
          name: true,
        },
        branch: {
          id: true,
          name: true,
        }
      }
    });

    const subcategoryMatch = (subcategoryId) ? (item.subcategory.id === Number(subcategoryId)) : null;
    const isFree = (free) ? await this.isFree({ id: item.id }) : null;

    if (subcategoryMatch === false) {
      throw new HttpException("Items subcategories do not match", HttpStatus.NOT_FOUND);
    }
  
    if (free === "true" && isFree === false) {
      throw new HttpException("Item is not free, but should be free", HttpStatus.CONFLICT);
    }

    if (free === "false" && isFree === true) {
      throw new HttpException("Item is free, but shold not be free", HttpStatus.CONFLICT);
    }

    return item;
  }

  async isFree(params: { id: number }) {
    const rentedItem = await this.rentedItemsRepository.findOne({
      relations: {
        item: true
      },
      where: {
        item: {
          id: params.id
        },
        end: IsNull()
      },
      select: {
        id: true
      }
    });

    return (rentedItem) ? false : true;
  }

  async countItems(subcategoryId: number, free: boolean) {
    const where = subcategoryId ? { subcategory: { id: subcategoryId } } : {}

    if (free === false)
      return this.rentalSalesService.countFreeItems(subcategoryId, free);

    const itemsCount = await this.itemsRepository.count({
      relations: {
        subcategory: true
      },
      where,
    });
    if (free === true)
      return this.rentalSalesService.countFreeItems(subcategoryId, free, itemsCount);

    return { count: itemsCount };
  }

}