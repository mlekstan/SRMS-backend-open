import { Injectable } from "@nestjs/common";
import { ClientIface } from "./interfaces/client.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectLiteral, Repository } from "typeorm";
import { Client } from "./client.entity";


function copyToRow<Entity extends ObjectLiteral>(row: Entity, dict: object) {
  
  function traverseDict(dict: object) {
    Object.keys(dict).forEach((key) => {
      if (typeof dict[key] === "object" && dict[key] !== null && !Array.isArray(dict[key])) {
        traverseDict(dict[key]);
      } else {
        if (key in row) {
          row[key as keyof Entity]= dict[key];
        } 
        // else {
        //   throw Error(`There is no such column ${key} in table.`)
        // }
      }
    })
  }

  traverseDict(dict);
}


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
    } catch (error) {
      throw(error)
    }
    
  }
}