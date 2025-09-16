export class AddItemDto {
  basicData: {
    barcode: string,
    itemSubcategory: string,
    name: string,
    shortName: string,
    marketValue: number,
  }
  saleData: {
    forSale: boolean,
    sellPrice: number,
  }
}