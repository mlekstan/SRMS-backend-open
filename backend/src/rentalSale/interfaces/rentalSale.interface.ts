export interface RentalSaleIface {
  cardId: number;
  categoryId: number;
  positions: { 
    subcategoryId: number; 
    speed: number | null; 
    numberOfItems: number; 
    rentalLength: string; 
    discount: string; 
  }[];
}