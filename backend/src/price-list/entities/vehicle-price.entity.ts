import { Vehicle } from "src/subcategories/vehicle.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IntervalTransformer } from "./IntervalTransformer";
import { RentalSalePosition } from "src/rentalSale/entities/rentalSalePosition.entity";


@Entity({ name: "vehicle_price" })
@Unique(["timeUnit", "vehicle"])
@Check(`"max_speed" > 0 AND "price" >= 0`)
export class VehiclePrice {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "interval", name: "time_unit", transformer: new IntervalTransformer() })
  timeUnit: string

  @Column({ type: "integer", name: "max_speed", nullable: true })
  maxSpeed: number

  @Column({ type: "numeric", precision: 9, scale: 2, name: "price" })
  price: string

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehiclePrices)
  @JoinColumn({ name: "vehicle_id", referencedColumnName: "id" })
  vehicle: Vehicle

  @OneToMany(() => RentalSalePosition, (rentalSalePosition) => rentalSalePosition.vehiclePrice)
  rentalSalePositions: RentalSalePosition[]
  
}