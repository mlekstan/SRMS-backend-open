import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";


@Entity({ name: "electric_drive_vehicle" })
export class ElectricVehicle {
  @PrimaryColumn()
  id: number

  @Column({ type: "integer", name: "engine_power" })
  enginePower: number

  @Column({ type: "integer", name: "battery_voltage" })
  batteryVoltage: number

  @Column({ type: "integer", name: "battery_capacity" })
  batteryCapacity: number

  @OneToOne(() => Vehicle, (vehicle) => vehicle.electricVehicle)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  vehicle: Vehicle

}