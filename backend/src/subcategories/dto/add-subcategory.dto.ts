export class AddSubcategoryDto {
  subcategoryData: { categoryId: number, name: string };
  vehicleData: { driveTypeId: number, curbWeight: number, maxLoad: number, minAge: number, maxAge: number };
  electricVehicleData: { enginePower: number, batteryVoltage: number, batteryCapacity: number };
}