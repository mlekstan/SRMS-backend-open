export class AddRentalSaleDto {
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