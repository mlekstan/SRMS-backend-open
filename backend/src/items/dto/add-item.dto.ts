export class AddItemDto {
  basicData: {
    barcode: string,
    subcategoryId: number,
    name: string,
    shortName: string,
    marketValue: number,
  }
  saleData: {
    forSale: boolean,
    sellPrice: number,
  }
}