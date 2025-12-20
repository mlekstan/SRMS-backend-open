import { Item } from "src/items/item.entity";
import { RentalSale } from "src/rentalSale/entities/rentalSale.entity";
import { User } from "src/users/user.entity";
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

  @Column({ type: "smallint", name: "flat_number", nullable: true })
  flatNumber: number

  @Column({ type: "varchar", length: 10, name: "zip_code" })
  zipCode: string

  @OneToMany(() => Item, (item) => item.branch)
  items: Item[]

  @OneToMany(() => User, (user) => user.branch)
  users: User[]

  @OneToMany(() => RentalSale, (rentalSale) => rentalSale.branch)
  rentalSales: RentalSale[]
  
}