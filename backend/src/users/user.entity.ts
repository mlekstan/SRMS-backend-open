import { Branch } from "../branches/branch.entity";
import { RentalSale } from "../rentalSale/entities/rentalSale.entity";
import { RentedItem } from "../rentalSale/entities/rentedItem.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("identity")
  id: number

  @Column({ type: "varchar", length: 40, name: "first_name" })
  firstName: string

  @Column({ type: "varchar", length: 40, name: "middle_name", nullable: true })
  middleName: string

  @Column({ type: "varchar", length: 80, name: "last_name" })
  lastName: string

  @Column({ type: "varchar", length: 254, name: "email", unique: true })
  email: string

  @Column({ type: "varchar", length: 7, name: "area_code", nullable: true })
  areaCode: string

  @Column({ type: "varchar", length: 13, name: "phone_number", nullable: true, unique: true })
  phoneNumber: string

  @Column({ type: "char", length: 60, name: "password" })
  password: string

  @Column({ type: "timestamp", name: "date_joined" })
  dateJoined: Date

  @ManyToOne(() => Branch, (branch) => branch.users, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

  @OneToMany(() => RentalSale, (rentalSale) => rentalSale.user)
  rentalSales: RentalSale[]

  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.startUser)
  startUserRentedItems: RentedItem[]
  
  @OneToMany(() => RentedItem, (rentedItem) => rentedItem.endUser)
  endUserRentedItems: RentedItem[]

}