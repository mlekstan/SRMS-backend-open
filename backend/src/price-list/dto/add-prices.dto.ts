export class AddPricesDto {
  positions: { id: number; timeUnit: string; maxSpeed: number, price: string }[];
  deletedPositions: { id: number; timeUnit: string; maxSpeed: number, price: string }[];
}