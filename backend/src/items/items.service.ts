import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { ItemIface } from "./interfaces/items.interface";



@Injectable()
export class ItemsService {
  private itemsRepository: Repository<Item>

  constructor(@InjectRepository(Item) itemsRepository: Repository<Item>) {
    this.itemsRepository = itemsRepository;
  }

  async add(item: ItemIface) {
    console.log(item)
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

  async findOne(params: { id: string }) {
    const item = await this.itemsRepository.findOneOrFail({
      where: {
        id: Number(params.id)
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

    return item;
  }
}