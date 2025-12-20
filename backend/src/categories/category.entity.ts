import { Subcategory } from "../subcategories/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "item_category" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "name" })
  name: string

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[]
}