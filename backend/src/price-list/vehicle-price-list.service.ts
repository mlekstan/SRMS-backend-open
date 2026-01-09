import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { VehiclePrice } from "./entities/vehicle-price.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryPriceList } from "./category-price-list.class";
import { PricesIface } from "./interfaces/prices.interface";


@Injectable()
export class VehiclePriceListServcie extends CategoryPriceList {
  private vehicePriceRepository: Repository<VehiclePrice>;

  constructor(
    @InjectRepository(VehiclePrice) vehiclePriceRepository: Repository<VehiclePrice>
  ) {
    super(1);
    this.vehicePriceRepository = vehiclePriceRepository;
  }

  async add(subcategoryId: number, prices: PricesIface) {

    if (prices.positions.length > 0) {
      const entities = prices.positions.map((p) => (
        this.vehicePriceRepository.create({
          id: p.id ?? undefined,
          vehicle: { id: subcategoryId },
          timeUnit: p.timeUnit,
          maxSpeed: p.maxSpeed,
          price: p.price
        })
      ));
      await this.vehicePriceRepository.save(entities);
    }

    if (prices.deletedPositions.length > 0) {
      const ids = prices.deletedPositions.map((dp) => (
        dp.id
      ));
      await this.vehicePriceRepository.delete(ids);
    }

    return await this.findAll(subcategoryId);
  }

  async findAll(subcategoryId: number) {
    const where = subcategoryId ? { vehicle: { id: subcategoryId } } : {};
    const positions = await this.vehicePriceRepository.find({
      where,
    });

    return positions;
  }

}