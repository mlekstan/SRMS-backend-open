import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Subcategory } from "./subcategory.entity";
import { DriveType } from "../driveTypes/driveType.entity";
import { ElectricVehicle } from "./electricVehicle.entity";
import { VehiclePrice } from "src/price-list/entities/vehicle-price.entity";


@Entity({ name: "vehicle" })
export class Vehicle {
  @PrimaryColumn()
  id: number

  @Column({ type: "integer", name: "curb_weight", nullable: true })
  curbWeight: number

  @Column({ type: "integer", name: "max_load", nullable: true })
  maxLoad: number

  @Column({ type: "smallint", name: "min_age", nullable: true })
  minAge: number

  @Column({ type: "smallint", name: "max_age", nullable: true })
  maxAge: number

  @OneToOne(() => Subcategory, (subcategory) => subcategory.vehicle)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  subcategory: Subcategory

  @ManyToOne(() => DriveType, (driveType) => driveType.vehicles)
  @JoinColumn({ name: "drive_type_id", referencedColumnName: "id" })
  driveType: DriveType

  @OneToOne(() => ElectricVehicle, (electricVehicle) => electricVehicle.vehicle)
  electricVehicle: ElectricVehicle

  @OneToMany(() => VehiclePrice, (vehiclePrice) => vehiclePrice.vehicle)
  vehiclePrices: VehiclePrice[]
}