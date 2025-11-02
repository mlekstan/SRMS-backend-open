import { Branch } from "src/branches/branch.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 40, name: "first_name" })
  firstName: string

  @Column({ type: "varchar", length: 40, name: "middle_name", nullable: true })
  middleName: string

  @Column({ type: "varchar", length: 80, name: "last_name" })
  lastName: string

  @Column({ type: "varchar", length: 254, name: "email" })
  email: string

  @Column({ type: "varchar", length: 7, name: "area_code", nullable: true })
  areaCode: string

  @Column({ type: "varchar", length: 13, name: "phone_number", nullable: true })
  phoneNumber: string

  @Column({ type: "varchar", length: 255, name: "password" })
  password: string

  @Column({ type: "timestamp", name: "date_joined" })
  dateJoined: Date

  @ManyToOne(() => Branch, (branch) => branch.users)
  @JoinColumn({ name: "branch_id", referencedColumnName: "id" })
  branch: Branch

}