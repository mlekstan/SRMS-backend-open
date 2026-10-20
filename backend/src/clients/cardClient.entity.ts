import { Card } from "../cards/card.entity"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";


@Entity({ name: "card_client" })
@Check(`"date_to" >= "date_from"`)
export class CardClient {
  @PrimaryGeneratedColumn("identity")
  id: number
  
  @Column({ type: "timestamp", name: "date_from" })
  dateFrom: Date

  @Column({ type: "timestamp", name: "date_to", nullable: true })
  dateTo: Date
  
  @ManyToOne(() => Card, (card) => card.cardClients, {
    onDelete: "SET NULL", 
    nullable: true
  })
  @JoinColumn({ name: "card_id", referencedColumnName: "id" })
  card: Card
 
  @ManyToOne(() => Client, (client) => client.clientCards, {
    onDelete: "SET NULL",  
    nullable: true 
  })
  @JoinColumn({ name: "client_id", referencedColumnName: "id" })
  client: Client
  
}