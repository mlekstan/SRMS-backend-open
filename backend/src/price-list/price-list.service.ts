import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryPriceList } from "./category-price-list.class";
import { VehiclePriceListServcie } from "./vehicle-price-list.service";
import { PricesIface } from "./interfaces/prices.interface";


@Injectable({
  
})
export class PriceListService {
  private services: CategoryPriceList[] = [];
  
  constructor(vehiclePriceListService: VehiclePriceListServcie) {
    this.services = [vehiclePriceListService];
  }

  async add(categoryId: number, subcategoryId: number, prices: PricesIface) {
    const service = this.selectSevice(categoryId);
    if (!service)
      throw new NotFoundException("Price list for this category do not exist");

    const result = await service.add(subcategoryId, prices);
    return result;
  }


  async findAll(categoryId: number, subcategoryId: number) {
    const service = this.selectSevice(categoryId);
    if (!service)
      throw new NotFoundException("Price list for this category do not exist");

    const prices = await service.findAll(subcategoryId);
    return prices;
  }

  selectSevice(categoryId: number) {
    const service = this.services.find((s) => s.isSupported(categoryId))
    return service;
  }

}