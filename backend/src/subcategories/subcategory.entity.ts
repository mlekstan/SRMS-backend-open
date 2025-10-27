import { Category } from "src/categories/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";


@Entity({ name: "item_subcategory" })
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar" , length: 255, name: "name" })
  name: string

  @OneToOne(() => Vehicle, (vehicle) => vehicle.subcategory)
  vehicle: Vehicle

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: "item_category_id", referencedColumnName: "id" })
  category: Category

}



