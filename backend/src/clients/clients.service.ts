import { Injectable } from "@nestjs/common";
import { ClientIface } from "./interfaces/client.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { copyToRow } from "src/helper-functions/copyToRow";



@Injectable()
export class ClientsService {
  private clientsRepository: Repository<Client>

  constructor( @InjectRepository(Client) clientsRepository: Repository<Client> ) {
    this.clientsRepository = clientsRepository;
  }

  async add(client: ClientIface) {
    try {
      const clientRow = new Client();
      
      clientRow.dateJoined = new Date()
      copyToRow(clientRow, client);

      await this.clientsRepository.save(clientRow);

      return client;
    } 
    catch (error) {
      throw(error);
    }
  }
}