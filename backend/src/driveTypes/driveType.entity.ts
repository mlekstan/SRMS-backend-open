import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "drive_type"})
export class DriveType {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "name" })
  name: string
}