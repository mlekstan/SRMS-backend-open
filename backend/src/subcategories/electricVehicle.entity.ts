import { Check, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";


@Entity({ name: "electric_drive_vehicle" })
@Check(`"engine_power" > 0 AND "battery_voltage" > 0 AND "battery_capacity" > 0`)
export class ElectricVehicle {
  @PrimaryColumn()
  id: number

  @Column({ type: "integer", name: "engine_power", nullable: true })
  enginePower: number

  @Column({ type: "integer", name: "battery_voltage", nullable: true })
  batteryVoltage: number

  @Column({ type: "integer", name: "battery_capacity", nullable: true })
  batteryCapacity: number

  @OneToOne(() => Vehicle, (vehicle) => vehicle.electricVehicle, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  vehicle: Vehicle

}