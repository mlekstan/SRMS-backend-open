import { Vehicle } from "../subcategories/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "drive_type"})
export class DriveType {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "varchar", length: 255, name: "name", unique: true })
  name: string

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driveType)
  vehicles: Vehicle[]
  
}