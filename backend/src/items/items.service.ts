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
}