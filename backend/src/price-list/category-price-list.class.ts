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

  transformInterval(interval: string) {
    const parts = interval.trim().split(" ")
    if (parts.length === 2) {
      const days = Number(parts[0]) * 24 * 60;

      const hoursMinutes = parts[1].split(":");
      if (hoursMinutes.length === 2) {
        const hours = Number(hoursMinutes[0]) * 60;
        const minutes = Number(hoursMinutes[1]);

        return days + hours + minutes;
      }
    }
    
    throw new Error("Invalid iterval format.");
  }

}