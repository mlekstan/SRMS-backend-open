import { Vehicle } from "src/subcategories/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IntervalTransformer } from "./IntervalTransformer";


@Entity({ name: "vehicle_max_speed_price" })
export class VehiclePrice {
  @PrimaryGeneratedColumn()
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
}