import { ApiProperty } from "@nestjs/swagger";

export class AddBranchDto {
  /** Branch data*/
  branchData: BranchDataDto
}

class BranchDataDto {
  
  @ApiProperty({ description: "Branch name", example: "HEXAL X Kraków" })
  name: string;
  /**Country @example Poland */
  country: string;
  /**City @example Kraków */
  city: string;
  /**Street @example Czarnowiejska */
  street: string;
  /**Street number @example 20 */
  streetNumber: number;
  /**Flat number @example 21 */
  flatNumber: number;
  /**Zip code @example 30-072 */
  zipCode: string;
}