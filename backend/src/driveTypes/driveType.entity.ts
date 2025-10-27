import { Vehicle } from "src/subcategories/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "drive_type"})
export class DriveType {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "name" })
  name: string

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driveType)
  vehicles: Vehicle[]
  
}