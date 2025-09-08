import { Body, Controller, Post, Req } from "@nestjs/common";
import { type Request } from "express";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";


@Controller("clients")
export class ClientsController {
  constructor(private clientService: ClientsService) {}


  @Post("create")
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }
}