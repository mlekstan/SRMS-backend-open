import { Injectable } from "@nestjs/common";
import { ClientIface } from "./interfaces/client.interface";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, IsNull, Repository } from "typeorm";
import { Client } from "./client.entity";
import { copyToRow } from "src/helper-functions/copyToRow";
import { Card } from "src/cards/card.entity";
import { CardClient } from "./cardClient.entity";
import { UpdateClientIface } from "./interfaces/updateClient.interface";



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
    const { cardData, personalData, contactData, residenceData } = client;

    const clientRow = this.clientsRepository.create({
      firstName: personalData.firstName,
      middleName: personalData.middleName,
      lastName: personalData.lastName,
      country: residenceData.country,
      city: residenceData.city,
      street: residenceData.street,
      streetNumber: residenceData.streetNumber,
      flatNumber: residenceData.flatNumber,
      zipCode: residenceData.zipCode,
      email: contactData.email,
      areaCode: contactData.areaCode,
      phoneNumber: contactData.phoneNumber,
      identityCardNumber: personalData.identityCardNumber,
      dateJoined: new Date(),
    });

    const cardRow = await this.cardsRepository.createQueryBuilder("card")
      .leftJoin("card.cardClients", "cardClient")
      .where("(cardClient.id IS NULL OR cardClient.dateTo IS NOT NULL)")
      .andWhere("card.id = :id", { id: cardData.cardId })
      .getOneOrFail();

    cardRow.isTemp = cardData.isTemp;

    const cardClientRow = new CardClient();
    cardClientRow.card = cardRow;
    cardClientRow.client = clientRow;
    cardClientRow.dateFrom = new Date();


    await this.dataSource.transaction(async (manager) => {
      await manager.save(cardRow);
      await manager.save(clientRow);
      await manager.save(cardClientRow);
    });

    return client;
  }

  async updateOne(params: { id: string }, client: UpdateClientIface) {
    const { cardData, personalData, residenceData, contactData } = client;

    console.log("Card data:", cardData.cards);
    console.log("Personal data:", personalData);
    console.log("Residence data:", residenceData);
    console.log("Contact data:", contactData);

    const cardRows = cardData.cards.map((card) => {
      const cardRow = this.cardsRepository.create({
        id: card.card.id,
        isTemp: card.card.isTemp
      });

      return cardRow;
    });

    let cardClientRows = await Promise.all(cardData.cards.map(async (card) => {
      
      if (card.type === "fetched" && card.isReturned) {
        const cardClientRow = await this.cardsClientsRepository.findOneOrFail({
          where: {
            client: {
              id: Number(params.id),
            },
            card: {
              id: card.card.id,
            },
            dateTo: IsNull(),
          }
        });

        cardClientRow.dateTo = new Date();
        
        return cardClientRow;
      }

      if (card.type === "added" && !card.isReturned) {
        const cardClientRow = this.cardsClientsRepository.create({
          client: {
            id: Number(params.id),
          },
          card: {
            id: card.card.id,
          },
          dateFrom: new Date(),
        });

        return cardClientRow;
      }
    }));

    cardClientRows = cardClientRows.filter((cardClientRow) => cardClientRow !== undefined);

    console.log("Card Client rows:", cardClientRows)

    const clientRow = this.clientsRepository.create({
      id: Number(params.id),
      firstName: personalData.firstName,
      middleName: personalData.middleName,
      lastName: personalData.lastName,
      identityCardNumber: personalData.identityCardNumber,
      country: residenceData.country,
      city: residenceData.city,
      street: residenceData.street,
      streetNumber: residenceData.streetNumber,
      flatNumber: residenceData.flatNumber,
      zipCode: residenceData.zipCode,
      areaCode: contactData.areaCode,
      phoneNumber: contactData.phoneNumber,
      email: contactData.email
    });


    await this.dataSource.transaction(async (manager) => {
      await Promise.all(
        cardRows.map(async (row) => await manager.save(row))
      );
      
      await Promise.all(
        cardClientRows.map(async (row) => await manager.save(row))
      );

      await manager.save(clientRow);
    });

    return client;
  }

  async findAll() {

    return await this.clientsRepository.createQueryBuilder("client")
      .leftJoinAndSelect("client.clientCards", "cardClient")
      .leftJoinAndSelect("cardClient.card", "card")
      .getMany();
  }

  async findOne(params: { id: string }) {
    
    return await this.clientsRepository.createQueryBuilder("client")
      .leftJoinAndSelect("client.clientCards", "cardClient")
      .leftJoinAndSelect("cardClient.card", "card")
      .where("client.id = :id", { id: Number(params.id) })
      .andWhere("cardClient.dateTo IS NULL")
      .getOne()
  }
}