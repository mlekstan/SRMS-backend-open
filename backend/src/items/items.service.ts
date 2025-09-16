import { Injectable } from "@nestjs/common";
import { Item } from "./interfaces/items.interface";



@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  add(item: Item) {
    this.items.push(item);
    console.log("ItemsBase:", this.items)
    return item
  }
}