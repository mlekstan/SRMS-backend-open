import { Item } from "src/items/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "branch" })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255, name: "name" })
  name: string

  @Column({ type: "varchar", length: 60, name: "country" })
  country: string

  @Column({ type: "varchar", length: 100, name: "city" })
  city: string

  @Column({ type: "varchar", length: 100, name: "street" })
  street: string

  @Column({ type: "smallint", name: "street_number" })
  streetNumber: number

  @Column({ type: "varchar", length: 10, name: "zip_code" })
  zipCode: string

  @OneToMany(() => Item, (item) => item.branch)
  items: Item[]
  
}