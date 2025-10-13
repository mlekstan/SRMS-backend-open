import { Injectable } from "@nestjs/common";
import { ClientIface } from "./interfaces/client.interface";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Client } from "./client.entity";
import { copyToRow } from "src/helper-functions/copyToRow";
import { Card } from "src/cards/card.entity";
import { CardClient } from "./cardClient.entity";



@Injectable()
export class ClientsService {
  private dataSource: DataSource
  private clientsRepository: Repository<Client>
  private cardsRepository: Repository<Card>
  private cardsClientsRepository: Repository<CardClient>

  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(Client) clientsRepository: Repository<Client>, 
    @InjectRepository(Card) cardsRepository: Repository<Card>,
    @InjectRepository(CardClient) cardsClientsRepository: Repository<CardClient>
  ) {
    this.dataSource = dataSource;
    this.clientsRepository = clientsRepository;
    this.cardsRepository = cardsRepository;
    this.cardsClientsRepository = cardsClientsRepository;
  }

  async add(client: ClientIface) {
    try {
      console.log(client)
      // Create clientRow object to save particular Client to client table in DB
      const clientRow = new Client();
      clientRow.dateJoined = new Date()
      
      // Copies values form client (request json) to clientRow (if keys are matching). 
      // In other case values under keys that are not in client Row are returned.
      const card = copyToRow(clientRow, client); 
      
      const cardRow = await this.cardsRepository.createQueryBuilder("card")
        .leftJoin(CardClient, "card_client", "card.id = card_client.card_id")
        .where("card_client.id IS NULL")
        .orWhere("date_to IS NOT NULL")
        .andWhere("barcode = :barcode", { barcode: card.cardBarcode})
        .getOneOrFail();

      cardRow.isTemp = card.isTemp;

      const cardClientRow = new CardClient();
      cardClientRow.card = cardRow;
      cardClientRow.client = clientRow;
      cardClientRow.dateFrom = new Date();

      
      await this.cardsRepository.save(cardRow);
      await this.clientsRepository.save(clientRow);
      await this.cardsClientsRepository.save(cardClientRow);

      return client;
    } 
    catch (error) {
      throw(error);
    }
  }
}