import { PricesIface } from "./interfaces/prices.interface";

export abstract class CategoryPriceList {
  private supportedCategoryId: number;

  constructor(supportedCategoryId: number) {
    this.supportedCategoryId = supportedCategoryId;
  }

  isSupported(categoryId: number) {
    return (categoryId === this.supportedCategoryId);
  };

  abstract add(subcategoryId: number, prices: PricesIface): Promise<any>
  abstract findAll(subcategoryId: number): Promise<any>
  abstract calculatePrice(params: Record<string, number | string | null>): Promise<{ price: number }>
  abstract calculateCharge(params: Record<string, number | string | null>): Promise<{ price: number, charge: number }>

}