import { Injectable } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { VehiclePrice } from "./entities/vehicle-price.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryPriceList } from "./category-price-list.class";
import { PricesIface } from "./interfaces/prices.interface";
import { CalculateChargeArgs, CalculatePriceArgs } from "./price-list.service";
import { transformInterval } from "src/helper-functions/transformInterval";


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

  async calculatePrice(params: Omit<CalculatePriceArgs, "categoryId">) {
    const { subcategoryId, speed, rentalLength, numberOfItems } = params;

    const query = this.vehicePriceRepository.createQueryBuilder("vp")
      .where("vp.vehicle = :subcategoryId", { subcategoryId })
      .select("vp.price", "price")
      .addSelect("EXTRACT(EPOCH from vp.timeUnit) / 60", "minutes")
      .orderBy("vp.timeUnit", "DESC");
        
    if (speed === null) {
      query.andWhere("vp.maxSpeed IS NULL");
    } else {
      query.andWhere("vp.maxSpeed = :speed", { speed: Number(speed) });
    }

    const timesPrices = await query.getRawMany();
    const rentalLengthMin = transformInterval(rentalLength);

    const price = this.complementMethod(timesPrices, rentalLengthMin) * numberOfItems;
    const floor = Math.floor(price);
    const roundPrice = (price - floor >= 0.5) ? floor + 0.5 : floor;

    return { price: roundPrice };
  }

  complementMethod(timesPrices: { price: string, minutes: string }[], timeMinutes: number) {
    let charge = 0;
    let countdown = timeMinutes;
    let i = 0;
    for (const tp of timesPrices) {
      const q = Math.floor(countdown / Number(tp.minutes));
      if (q >= 1) {
        charge += (q * Number(tp.price));
        countdown -= (q * Number(tp.minutes));
      } 
      if (timesPrices.length - 1 === i && countdown !== 0) {
        charge += (countdown / Number(tp.minutes) * Number(tp.price));
        countdown = 0;
      }
      if (countdown === 0)
        break;
      
      i++;
    }

    return charge;
  }

  async calculateCharge(params: Omit<CalculateChargeArgs, "categoryId">) {
    const { discount, ...rest } = params;
    const price = (await this.calculatePrice(rest)).price;
    const charge =  price - Number(discount);

    return { price, charge };
  }

  async findSpeeds(subcategoryId: number) {
    const speeds = await this.vehicePriceRepository.createQueryBuilder("vp")
      .distinctOn(["vp.maxSpeed"])
      .where("vp.vehicle = :subcategoryId", { subcategoryId })
      .select(["vp.id", "vp.maxSpeed"])
      .getMany();

    return speeds;
  }
}