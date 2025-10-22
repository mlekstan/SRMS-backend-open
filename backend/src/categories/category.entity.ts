import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "item_category" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "name" })
  name: string
}