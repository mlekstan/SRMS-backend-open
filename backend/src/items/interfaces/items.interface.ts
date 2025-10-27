export interface ItemIface {
  basicData: {
    barcode: string,
    subcategoryId: number,
    branchId: number,
    name: string,
    shortName: string,
    marketValue: number,
  },
  saleData: {
    forSale: boolean,
    sellPrice: number,
  }
}